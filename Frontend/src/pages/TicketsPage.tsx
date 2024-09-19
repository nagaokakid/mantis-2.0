import { useMenuItemContext } from "../contexts/MenuItemContext";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { GetAllUserTicketsRequest } from "../requests/ApiRequestHandler";
import LoadingWheel from "../components/ui/LoadingWheel";
import { Table, Button } from "flowbite-react";
import CreateTicketModal from "../components/ui/CreateTicketModal";
import { ToastSuccess } from "../components/ui/Toast";
import { UseToast } from "../hooks/UseToast";
import { UserBasicInfo } from "../data/DTO";
import { useNavigate } from "react-router-dom";
import ITicket from "../data/Ticket";

const getAllUserTickets: (userId: string) => Promise<ITicket[]> = async (userId) => {
  const response = await GetAllUserTicketsRequest(userId);
  const tickets: ITicket[] = await response.json();
  return tickets;
};

const simplifyDateValue = (dateObj: any): string =>
{
  if (!dateObj)
  {
    return "";
  }

  const newDate = new Date(dateObj);

  return newDate.toLocaleString();
}

const TicketsPage = () => {
  const {setSelectedItem} = useMenuItemContext();
  const userContext = useContext(UserContext);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createTicketModal, setCreateTicketModal] = useState(false);
  const {showToast, message, displayToast} = UseToast();
  const navigate = useNavigate();

  // get all tickets for a user
  const fetchTickets = async (user: UserBasicInfo) => {
    setIsLoading(true);
    const allTickets = await getAllUserTickets(user.id);
    setTickets(allTickets);
    setIsLoading(false);
  }

  const openModal = () => {
    setCreateTicketModal(true);
  }

  const closeModal = () => {
    setCreateTicketModal(false);
  }

  const handleTicketRowClick = (id: string) => {
    navigate(id);
  }

  // change selected menu item to "projects"
  useEffect(() => {
    setSelectedItem("tickets")
  }, []);

  // fetch user projects on initial component mount
  useEffect(() => {
    if (userContext && userContext.user)
    {
      const user: UserBasicInfo = userContext.user;
      fetchTickets(user);
    }
  }, [])

  // update user projects list every time a new project is created
  useEffect(() => {
    if (userContext && userContext.user && showToast)
    {
      const user: UserBasicInfo = userContext.user;
      fetchTickets(user);
    }
  }, [showToast])

  // show spinner while loading or user context is undefined
  if (isLoading || !userContext || !userContext.user)
  {
    return (<LoadingWheel/>)
  }

  return (
    <div>

      <Button
      onClick={openModal}
      className="bg-customGreen hover:bg-buttonHover mb-4">Create Ticket
      </Button>

    <div className="overflow-x-auto">
      <Table hoverable className="w-full">
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Project</Table.HeadCell>
          <Table.HeadCell>Created</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Priority</Table.HeadCell>
          <Table.HeadCell>Difficulty</Table.HeadCell>
          <Table.HeadCell><span className="sr-only">Edit</span></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tickets.slice().reverse().map((ticket) => (
            <Table.Row onClick={() => handleTicketRowClick(ticket.id)} 
            key={ticket.id} 
            className="bg-white hover:bg-tableHover hover:cursor-pointer dark:border-gray-700 dark:bg-gray-800 whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <Table.Cell className="max-w-2xs truncate">{ticket.title}</Table.Cell>
              <Table.Cell className="max-w-2xs truncate">{}</Table.Cell>
              <Table.Cell className="max-w-2xs truncate">{simplifyDateValue(ticket.created)}</Table.Cell>
              <Table.Cell className="max-w-2xs truncate">{ticket.status}</Table.Cell>
              <Table.Cell className="max-w-2xs truncate">{ticket.priority}</Table.Cell>
              <Table.Cell className="max-w-2xs truncate">{ticket.difficulty}</Table.Cell>
              <Table.Cell className="max-w-2xs truncate"><a href="#" className=" text-link hover:underline dark:text-cyan-500">Edit</a></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      
      </Table>

      {createTicketModal && <CreateTicketModal onClose={closeModal} displayToast={displayToast} project={undefined} fromProjectPage={false}/>}
      
      <div className="fixed bottom-4 right-4 z-50">
        {showToast && <ToastSuccess message={message}/>}
      </div>
    </div>
    </div>
  )
}

export default TicketsPage