interface IProps {
    type: string;
    name: string;
    id: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BaseInput = ({ type, name, id, onChange }: IProps) => {
    return <input type={type} name={name} id={id} onChange={onChange} />;
};

export default BaseInput;
