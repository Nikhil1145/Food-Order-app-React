import classes from './Checkout.module.css';
import { useRef , useState } from 'react';
const Checkout = (props) => {
    const [formInputsValidity , setFormInputValidity] = useState({
      name:true,
      street:true,
      city:true,
      postalCode:true
    });

  const isEmpty = value => value.trim() === '';
  const isFiveChars = value =>value.trim().length===5;

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();
    
  const confirmHandler = (event) => {
    event.preventDefault();
   const enteredName = nameInputRef.current.value;
   const enteredStreet = streetInputRef.current.value;
   const enteredPostalCode = postalCodeInputRef.current.value;
   const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid =isFiveChars(enteredPostalCode);

    setFormInputValidity({
      name:enteredNameIsValid,
      street:enteredStreetIsValid,
      city:enteredCityIsValid,
      postalCode:enteredPostalCodeIsValid
    })

    const formIsValid = 
    enteredCityIsValid && 
    enteredNameIsValid && 
    enteredPostalCodeIsValid && 
    enteredStreetIsValid


    if(!formIsValid){
      return;
    }
    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      city:enteredCity,
      postalCode:enteredPostalCode
    })
  };

  const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid }`
  const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid }`
  const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid }`
  const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid }`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please Enter a Valid Name</p> }
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please Enter a Valid street Name</p> }
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && <p>Please Enter a Valid Postal Code</p> }
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please Enter a Valid city Name</p> }
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;