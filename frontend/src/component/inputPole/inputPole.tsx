import { forwardRef } from "react";
import style from './inputPole.module.css';

// Оголошення інтерфейсу для пропсів компонента InputProps (який успадковує всі атрибути стандартного HTML input)
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label? : string;
    error? : string;
    helperText? : string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
(
    {
        label,
        error,
        id,
        ...props
    },
    ref
) => {
    return(
        <div className={style.inputContainer}>
            {label && <label htmlFor={id}>{label}</label>}

            <input id={id} ref={ref} {...props} />

            {error && <span className={style.error}>{error}</span>}
        </div>
    )
});