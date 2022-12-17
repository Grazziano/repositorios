import React, { useEffect, useState } from 'react';
import { Container } from './styles';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

export default function Repositorio() {
  const params = useParams();

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(params.repositorio);

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
      ]);

      setRepositorio(repositorioData.data);
      setIssues(issuesData.data);

      setLoading(false);
    }

    load();
  }, [params.repositorio]);

  return <Container>{decodeURIComponent(params.repositorio)}</Container>;
}
