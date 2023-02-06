import { useEffect, useState } from 'react'

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Container, Form, Avatar } from './styles'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { useAuth } from '../../hooks/auth'

export function Profile() {
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // const [disabledButton, setDisabledButton] = useState(true)

  async function handleUpdate() {
    const user = {
      name,
      email,
      old_password: currentPassword,
      password: newPassword
    }
    // if (!disabledButton) {
    await updateProfile({ user })
    // }
  }

  // TODO: criar validação dos campos e desabilitar botão salvar
  // useEffect(() => {
  //   if (name && email && oldPassword && newPassword) {
  //     setDisabledButton(false)
  //   }
  //   setDisabledButton(true)
  // }, [name, email, oldPassword, newPassword])

  return (
    <Container>
      <header>
        <Link to="/">
          <FiArrowLeft />
        </Link>
      </header>

      <Form>
        <Avatar>
          <img src="http://github.com/dbento-dev.png" alt="user photo" />

          <label htmlFor="avatar">
            <FiCamera />
            <input id="avatar" type="file" />
          </label>
        </Avatar>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Input
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button
          title="Salvar"
          onClick={handleUpdate}
          // disabled={disabledButton}
        />
      </Form>
    </Container>
  )
}
