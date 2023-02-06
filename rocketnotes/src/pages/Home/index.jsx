import { useEffect, useState } from 'react'

import { FiPlus, FiSearch } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'
import { api } from '../../services/api'

export function Home() {
  const [tags, setTags] = useState([])

  const [selectedTag, setSelectedTag] = useState([])

  function handleSelectedTag(tagName) {
    const alreadySelected = selectedTag.includes(tagName)

    if (alreadySelected) {
      const filteredTags = selectedTag.filter((tag) => tag !== tagName)

      setSelectedTag(filteredTags)
    } else {
      setSelectedTag((prevState) => [...prevState, tagName])
    }
  }

  useEffect(() => {
    async function getTags() {
      const response = await api.get('/tags')

      setTags(response.data)
    }

    getTags()
  }, [])

  return (
    <>
      <Container>
        <Brand>
          <h1>Rocketnotes</h1>
        </Brand>
        <Header />

        <Menu>
          <li>
            <ButtonText
              title="Todos"
              onClick={() => handleSelectedTag('all')}
              isActive={selectedTag.length === 0}
            />
          </li>
          {tags &&
            tags.map((tag) => (
              <li key={String(tag.id)}>
                <ButtonText
                  title={tag.name}
                  onClick={() => handleSelectedTag(tag.name)}
                  isActive={selectedTag.includes(tag.name)}
                />
              </li>
            ))}
        </Menu>

        <Search>
          <Input placeholder="Pesquisar pelo título" icon={FiSearch} />
        </Search>

        <Content>
          <Section title="Minhas notas">
            <Note
              data={{
                title: 'React',
                tags: [
                  { id: 1, name: 'reactjs' },
                  { id: 2, name: 'front-end' }
                ]
              }}
            />
            <Note
              data={{
                title: 'JavaScript',
                tags: [
                  { id: 1, name: 'javascript' },
                  { id: 2, name: 'front-end' }
                ]
              }}
            />
          </Section>
        </Content>

        <NewNote to="/new">
          <FiPlus /> Criar nota
        </NewNote>
      </Container>
    </>
  )
}
