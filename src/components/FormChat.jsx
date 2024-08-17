
// eslint-disable-next-line react/prop-types
function FormChat ({handleChange, handleSubmit, valueInput}) {
    return (
        <form className="flex p-4 border-t border-gray-200" onSubmit={handleSubmit}>
                    <input
                        value={valueInput}
                        onChange={handleChange}
                        type="text"
                        placeholder="Mensaje a cohere"
                        className="text-gray-900 w-full p-2 border border-gray-300 rounded-l"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-r"
                    >
                        Enviar
                    </button>
        </form>
    )
}

export default FormChat;