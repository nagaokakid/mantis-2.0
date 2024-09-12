import { Badge } from "flowbite-react";


interface StatusBadgeProps 
{
    status?: string,
    size?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({status, size}) => 
{
    let badgeColor: string = "light";
    let badgeSize = "";

    switch(status)
    {
        case "New":
            badgeColor = "teal";
            break;
        case "In Progress":
            badgeColor = "blue";
            break;
        case "On Hold":
            badgeColor = "yellow";
            break;
        case "Pending Review":
            badgeColor = "purple";
            break;
        case "Reopened":
            badgeColor = "dark"
            break;
        case "Completed":
            badgeColor = "green";
            break;
        case "Cancelled":
            badgeColor = "red";
            break;
    }

    if (size)
    {
        badgeSize = size;
    }

    return (
    <div>
        <Badge color={badgeColor} size={badgeSize}>{status}</Badge>
    </div>
    );
}