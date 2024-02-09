/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-types */
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';
import Button from '../../components/ButtonComponent/Button.component';
import Input from '../../components/InputComponent/Input.component';
import { useAuth } from '../../hooks/AuthHook';
import { useToast } from '../../hooks/ToastHook';
import { Credentials } from '../../models/Credentials.model';
import { UserData } from '../../models/UserData.model';
import { GoStackError } from '../../services/api';
import { Background, Container, Content } from './signin.styles';

export const SignIn: React.FC = () => {
	const [user, setUser] = useState<Credentials>({} as Credentials);
	const { signIn } = useAuth();
	const { addToast } = useToast();
	const navigate = useNavigate();

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
					email: Yup.string().required('Email is required').email('Type a valid email address'),
					password: Yup.string().required('Password is required'),
				});
				await schema.validate(user as Credentials, { abortEarly: false });
				await signIn(user)
					.then((response: UserData) => {
						navigate('/home');
						addToast({
							title: 'Sucesso!',
							description: `Login efetuado com sucesso. Bem vindo ${response.user.name}!`,
							type: 'success',
						});
					})
					.catch((erro: GoStackError) => {
						addToast({
							title: `${erro.response.data.status} ${erro.response.data.code}`,
							description: erro.response.data.description,
							type: 'error',
						});
					});
			} catch (err) {
				console.log((err as Yup.ValidationError).errors);
			}
		},
		[user, addToast]
	);

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { name, value } = event.target;
			setUser({
				...user,
				[name]: value,
			});
		},
		[user]
	);

	return (
		<>
			<Container>
				<Content>
					<img src={logo} alt="Gobarber-logo" />
					<form onSubmit={handleSubmit}>
						<h1>Faça seu logon</h1>
						<Input
							name="email"
							onChange={(e) => handleChange(e)}
							icon={FiMail}
							type="email"
							placeholder="E-mail"
							required
						/>
						<Input
							name="password"
							onChange={(e) => handleChange(e)}
							icon={FiLock}
							type="password"
							placeholder="Senha"
							required
						/>
						<Button type="submit">Entrar</Button>
						<a href="forgot">Esqueci minha senha</a>
					</form>
					<Link to="/signup">
						<FiLogIn />
						Criar conta
					</Link>
				</Content>
				<Background />
			</Container>
		</>
	);
};
