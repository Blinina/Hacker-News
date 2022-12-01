import { Link } from 'react-router-dom'
import notFoundImg from '../images/plak-plak.jpg'

export default function NotFound() {
    return (
        <div className='not-found'>
            <img src={notFoundImg} alt="Плак-плак.Страница не найдена" />
            <div>
                <h2>Страница не найдена</h2>
                <Link to="/">Перейти на главную страницу</Link>
            </div>
        </div>
    )
}