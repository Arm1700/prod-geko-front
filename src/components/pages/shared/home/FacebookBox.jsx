import { useEffect} from 'react';

const FacebookBox = () => {

    useEffect(() => {
        // Инициализация Facebook SDK
        const initializeFB = () => {
            if (window.FB) {
                window.FB.init({
                    appId: '1263217894882530', // Ваш Facebook App ID
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v21.0', // Версия SDK
                });
                window.FB.XFBML.parse(); // Парсинг XFBML (обновление содержимого)
            } else {
                console.warn('Facebook SDK не загружен.');
            }
        };

        // Проверяем, загружен ли Facebook SDK
        if (!window.fbAsyncInit) {
            window.fbAsyncInit = initializeFB;
        } else {
            initializeFB();
        }
    }, []); // Инициализируем SDK только один раз при монтировании компонента

    return (
        <div className="facebook-box">
            <div className="fb-page-container" style={{ position: 'relative' }}>
                <div
                    className="fb-page"
                    data-href="https://www.facebook.com/GekoOnlineEducation" // Ссылка на вашу страницу
                    data-tabs="timeline" // Показываем таймлайн
                    data-width='280' // Динамическая ширина
                    data-height="400" // Высота блока
                    data-small-header="false" // Отключение маленького заголовка
                    data-adapt-container-width="true" // Адаптация ширины под контейнер
                    data-hide-cover="false" // Показываем обложку
                    data-show-facepile="true" // Показываем фотографии друзей
                ></div>

                <div
                    className="fb-like"
                    data-href="https://www.facebook.com/GekoOnlineEducation" // Ссылка на вашу страницу
                    data-layout="button" // Тип кнопки
                    data-action="like" // Действие кнопки
                    data-size="small" // Размер кнопки
                    data-share="false" // Отключаем кнопку шаринга
                    style={{
                        position: 'absolute',
                        top: '18%', // Позиционирование кнопки
                        left: '38px', // Позиционирование кнопки
                        transform: 'translateX(-50%)', // Центрирование кнопки по горизонтали
                    }}
                ></div>
            </div>
        </div>
    );
};

export default FacebookBox;
