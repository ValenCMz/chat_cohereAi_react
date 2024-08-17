import { useAppContext } from '../context/ChatsContext.jsx';

// eslint-disable-next-line react/prop-types
function FormNewChat ({inputRef = null, textButton}) {
    const {initChat} = useAppContext();

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevenir la recarga de la página
        initChat(inputRef.current.value); // Inicializar el chat con el valor del input
    };

    return (
        <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <label htmlFor="">Introduce el nombre del chat</label>
              <input
                type="text"
                placeholder="Nombre del chat"
                className="text-neutral-950 rounded text-center"
                ref={inputRef}
                required
              />
              <button className="text-sm bg-gray-700 p-2 rounded-md" type='submit'>
                {textButton}
              </button>
            </form>
    )
}

export default FormNewChat;