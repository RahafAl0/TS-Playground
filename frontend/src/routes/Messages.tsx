/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Search from './search.tsx';
import DeleteMessages from './DeleteMessage.tsx';
import EditMessages from './EditMessages.tsx';

export default function Messages() {
  const { isLoading, isError, data } = useQuery(['messages'], async () => {

    const { data } = await axios.get('http://localhost:3000/messages');
    return data;
  });


  return (
    <div>
      <Search />
      <h1>Messages!</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading messages</p> 
      ) : (
        <ul>
          {data.messages.map((item: any, idx: any) => (
            <li key={idx}>
              {item.username}
              <p>
                {item.message}
                <DeleteMessages id={item.id} />
                <EditMessages id={item.id} />
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}