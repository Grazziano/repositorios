import React, { useCallback, useState } from 'react';
import { Container, Form, SubmitButton } from './styles';
import { FaGithub, FaPlus } from 'react-icons/fa';
import api from '../../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);

  function handleInputChange(event) {
    setNewRepo(event.target.value);
  }

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      async function submit() {
        const response = await api.get(`repos/${newRepo}`);

        const data = {
          name: response.data.full_name,
        };

        setRepositorios([...repositorios, data]);
        setNewRepo('');
      }

      submit();
    },
    [newRepo, repositorios]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleInputChange}
        />
        <SubmitButton>
          <FaPlus color="#FFF" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}
