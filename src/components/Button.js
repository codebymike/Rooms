export default function Button({onClick,children}){

    return (
        <button onClick={onClick} type="button" className='mx-auto bg-yellow-300 border-2 border-dashed rounded-lg border-yellow-dark p-4 shadow-md text-fuchsia-600 font-bold'>
            {children}
        </button>
    )
}