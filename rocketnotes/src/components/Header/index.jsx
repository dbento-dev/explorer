import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './styles'

export function Header() {
  return (
    <Container>
      <Profile>
        <img src="http://github.com/dbento-dev.png" alt="user photo" />
        <div>
          <span>Bem vindo,</span>
          <strong>David Bento</strong>
        </div>
      </Profile>

      <Logout>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}
