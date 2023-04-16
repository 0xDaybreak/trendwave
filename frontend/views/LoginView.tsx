import { login } from '@hilla/frontend';
import { Button } from '@hilla/react-components/Button.js';
import { useNavigate } from 'react-router-dom';
import {UserEndpoint} from "Frontend/generated/endpoints";
import User from "Frontend/generated/com/video/application/entity/User";

export const LoginView = () => {
  const navigate = useNavigate();
    const user: User = {
        username: "johndoes",
        password:"1234",
    };
  return (
      <div>
        <Button
            theme="primary"
            onClick={() =>
                login('user', 'password')
                    .then(() => navigate('/'))
                    .catch((e) => console.warn(e))
            }
        >
          Login
        </Button>
          <Button
              theme="primary"
              onClick={() =>
                  UserEndpoint.saveUser(user)
                      .then(() => navigate('/'))
                      .catch((e) => console.warn(e))
              }>Create user</Button>
      </div>
  );
}