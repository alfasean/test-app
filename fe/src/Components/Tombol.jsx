import Button from 'react-bootstrap/Button';

function ButtonInput({name, color, type, onClick}) {
  return (
    <>
      <Button onClick={onClick} type={type} variant={color}>{name}</Button>
    </>
  );
}

export default ButtonInput;