# Square Meter Project

## Технологии
- HTML5
- CSS3
- JavaScript ES6+
- Bootstrap
- WebPack
- Babel

## Описание
Square Meter Project - это SPA для интернет магазина недвижимости.  

Все изменения происходят в приделах одной страници.


В SPA представленно всего 18 различных квартир из пяти разных строительных компаний.  
При старте страници подгружаеться фильтр и отображаються все имеющиеся на сервере квартиры.


Square Meter Project состоит из главного фильтра, поля отображения обьектов, фильтра по возрастанию и убыванию по цене и по площади. Присутствуют два возможных типа отображения обьектов.  
Кликнув по ссылке "Избранное" в шапке страници отображаются все обьекты которые были добавлены в избранное.  
Ссылка "Заявки" загружает все заявки которые поступили на сервер и отображает их.
Кликнув по карточке квартиры пользователь сможет подробно ознакомиться с характиристиками данного продукта а так же подать заявку на его покупку.

###### Фильтры
Главный фильтр который мы видим при загрузки страници дает возможность пользователю более подробно формулировать свой запрос.  
Пользователь получает возможность фильтровать обьекты по:
  1. Названию строительной компании
  2. Количеству комнат в квартире
  3. Площади жилого помещения
  4. Цене
  
  
После настройки фильтра пользователь должен произвести клик по кнопке отображения обьектов, после чего отобразяться только те обьекты которые подпадают под настройки фильтра.  
К слову, кнопка отображения данных заранее показывает пользователю, сколько обьктов было найдено и был ли они найдены вообще.

Фильтр в виде выпадающего меню ниже кнопки отображения дает возможность пользователю сортировать отображенные обьекты по цене и по площади.  
Фильтр в виде двух иконок дает пользователю возможность выбора отображения обьектов. В виде карточек либо в виде таблици.   
Если пользователь выбирает способ отображения - таблицу, то отображаеться еще один фильтр который дает возможность отображать обьекты в отсортированом виде. Сортировка в табличном фильтре происходит по возрастанию и убыванию.  
Табличный фильтр дает возможность сортировать по определенным параметрам.  
Все настройки фильтра сохраняються. Это значит что после перезагрузки станици пользователь увидит все свои предыдущие настройки фильтра, если он были.

###### Страница товара
Если кликнуть по карточке с товаром то отображаються подробные данные по этому товару:
  1. Название строительной компании
  2. Площадь
  3. Количество комнат
  4. Этаж
  5. Цена
  6. Цена за квадратный метр
  7. Номер квартиры
На странице товара пользователь может подать заявку на покупку квартиры нажав на кнопку "Book now". При клике отобразиться модальное окно которое дает возможность ввести сво имя и номер телефона для того что бы администрация могла связаться с заказчиком.  


###### Избранное
Перейдя по ссылке "Избранное", в шапке страници, пользователь может увидеть все товары которые он добавил в избраное отметив нужный товар сердечком.

###### Заявки
Эта ссылка находиться в шапке страници и предназначена только для администрации. Тут отображаються все заявки которые были получены путем заполнеия пользователями формы на Странице товара.  

## Техническое описание

Для SPA приложения был написан роутер, благодаря которому данные подгружаются 
