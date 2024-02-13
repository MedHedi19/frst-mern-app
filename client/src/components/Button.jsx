function Button(props) {
  const buttonClassName = `bg-${props.color} hover:bg-${props.hoverColor} text-white font-bold py-2 px-4 rounded mr-2`;

  return (
    <button className={buttonClassName} onClick={props.onClick} >
      {props.name}
    </button>
  );
}

export default Button;
