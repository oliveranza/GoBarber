/* eslint-disable no-extra-parens */
/* eslint-disable react/no-unknown-property */
import React, { FormEvent, InputHTMLAttributes, useCallback, useRef, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './Input.styles';

const erros: Record<keyof ValidityState, string> = {
	badInput: 'badInput',
	customError: 'customError',
	patternMismatch: 'patternMismatch',
	rangeOverflow: 'rangeOverflow',
	rangeUnderflow: 'rangeUnderflow',
	stepMismatch: 'stepMismatch',
	tooLong: 'Max lenght is ##',
	tooShort: 'Min lenght is ##',
	typeMismatch: 'Enter a valid ##',
	valid: 'valido/invalido',
	valueMissing: '## is required',
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => {
	const [isFocused, setFocused] = useState(false);
	const [isFilled, setFilled] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFocus = useCallback(() => {
		setFocused(true);
		setHasError(false);
		setErrorMessage('');
	}, []);

	const handleBlur = useCallback(
		(event: FormEvent<HTMLInputElement>) => {
			if (!event.currentTarget.checkValidity()) {
				return handleError(event);
			}
			setFocused(false);
			setFilled(!!inputRef.current?.value);
		},
		[isFocused]
	);

	const handleError = useCallback((event: FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		setHasError(true);
		const ele = event.currentTarget;
		const validity = ele.validity;
		let valid = '';
		for (const key in validity) {
			if (validity[key as keyof ValidityState]) {
				valid = key;
			}
		}
		let replacer = ele.name;
		if (valid === 'tooLong') {
			replacer = ele.maxLength.toString();
		}
		if (valid === 'tooShort') {
			replacer = ele.minLength.toString();
		}
		setErrorMessage(erros[valid as keyof ValidityState].replace('##', replacer));
	}, []);

	return (
		<>
			<Container $isFocused={isFocused} $isFilled={isFilled} $haserror={hasError}>
				{Icon && <Icon size={20} />}
				<input
					ref={inputRef}
					autoComplete="off"
					onFocus={handleFocus}
					onBlur={(e) => handleBlur(e)}
					{...rest}
				/>
				{hasError && (
					<Error titulo={errorMessage}>
						<FiAlertCircle color="#c53030" size={20} />
					</Error>
				)}
			</Container>
		</>
	);
};
export default Input;
