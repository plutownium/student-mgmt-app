interface DeleteButtonProps {
    id: number;
    callDelete: (id: number) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, callDelete }: DeleteButtonProps) => {
    return (
        <div>
            <button
                onClick={() => {
                    callDelete(id);
                }}
            >
                X
            </button>
        </div>
    );
};

export default DeleteButton;
