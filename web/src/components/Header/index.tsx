import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../common/contexts/authContext';
import Button from '../Button';

function Header() {
  const { signOut, user } = useContext(AuthContext);

  async function logout(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    await signOut();
  }

  return (
    <header className="bg-black py-2">
      <div className="flex items-center justify-end mx-auto py-4 px-12">

        <div className="flex items-center w-auto space-x-8" >
          <ul className="font-medium flex flex-row p-0 space-x-8 mt-0">
            <li>
              <NavLink to="/" className="block py-2 px-3 text-white md:p-0 hover:text-yellow-400">
                Início
              </NavLink>
            </li>
            <li>
              <NavLink to="/cotacao" className="block py-2 px-3 text-white md:p-0 hover:text-yellow-400">
                Realizar Cotação
              </NavLink>
            </li>
          </ul>
          

          <div>
      <p className="block py-2 px-3 text-white">
        Logado(a) como  
        <span>
          {user && 'name' in user ? " " + user.name + "!" : ""}
        </span>
      </p>
    </div>



          <Button
            type="button"
            handleClick={logout}
          >
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
