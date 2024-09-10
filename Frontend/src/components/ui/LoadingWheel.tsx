import {Spinner} from 'flowbite-react'

const LoadingWheel = () => {
  return (
    <div className="flex flex-col h-[80vh] w-full justify-center text-center items-center">
      <Spinner className="flex-grow" size="xl" color="success" aria-label="Logo colored spinner" />
    </div>
  )
}

export default LoadingWheel