/* eslint-disable @typescript-eslint/ban-types */
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ValidationError } from 'yup';
import logo from '../../assets/logo.svg';
import Button from '../../components/ButtonComponent/Button.component';
import Input from '../../components/InputComponent/Input.component';
import { useDebounce } from '../../hooks/debounceHook';
import { Background, Container, Content } from './signup.styles';
import { useToast } from '../../hooks/ToastHook';

interface User {
	name: string;
	email: string;
	password: string;
}
let tempUser = {
	name: '',
	email: '',
	password: '',
} as User;

export const SignUp: React.FC = () => {
	const [user, setUser] = useState<User>(tempUser);
	const [isFilled, setIsFilled] = useState(false);
	const db = useDebounce(300);
	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		const isAuthenticated = !!sessionStorage.getItem('@GoBarber:token');
		console.log('useEffect');
		if (isAuthenticated) {
			console.log('autenticado');
			navigate('/home');
		}
	}, [navigate]);

	const handleSubmit = useCallback(
		async (event: FormEvent) => {
			event.preventDefault();
			try {
				const schema = Yup.object().shape({
					name: Yup.string().required('Name is required'),
					email: Yup.string().required('Email is required').email('Type a valid email address'),
					password: Yup.string().required('Password is required').min(6, 'Min lenght 6 characters'),
				});
				await schema.validate(user, { abortEarly: false });
				toast.addToast()
				alert('Usuário cadastrado com sucesso');
				navigate('/');
			} catch (err) {
				console.log((err as ValidationError).errors);
			}
		},
		[user]
	);

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>, debouceId: string, deb: Function) => {
			const { name, value } = event.target;
			tempUser = {
				...tempUser,
				[name]: value,
			} as User;
			deb(debouceId, () => {
				setUser(tempUser);
				if (tempUser.email && tempUser.name && tempUser.password) {
					setIsFilled(true);
				} else {
					setIsFilled(false);
				}
			});
		},
		[tempUser]
	);

	return (
		<>
			<Container>
				<Background />
				<Content>
					<img src={logo} alt="Gobarber-logo" />
					<form onSubmit={(e) => handleSubmit(e)}>
						<h1>Faça seu cadastro</h1>
						<Input
							name="name"
							onChange={(e) => handleChange(e, '1', db)}
							icon={FiUser}
							placeholder="Nome"
							required
						/>
						<Input
							name="email"
							onChange={(e) => handleChange(e, '2', db)}
							icon={FiMail}
							placeholder="E-mail"
							type="email"
							required
						/>
						<Input
							type="password"
							name="password"
							onChange={(e) => handleChange(e, '3', db)}
							icon={FiLock}
							placeholder="Senha"
							required
							minLength={6}
						/>
						<Button disabled={!isFilled} type="submit">
							Cadastrar
						</Button>
					</form>
					<Link to="/signin">
						<FiArrowLeft size={20} />
						Voltar para logon
					</Link>
				</Content>
			</Container>
		</>
	);
};
