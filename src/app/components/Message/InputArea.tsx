import Parchment from '../Parchment/Parchment';
import InputForm from '../InputForm/InputForm';

type InputAreaProps = {
  setVisible: Function;
  visible: boolean;
}



const InputArea = (props: InputAreaProps) => {
  return (
    <Parchment setVisible={props.setVisible}>
      <InputForm {...props}/>
    </Parchment>
  )
}

export default InputArea;