import React, {useEffect, useState} from "react";

import axios from "axios";
import main from '../styles/Main.module.css'
import logo from '../Main/img/pizza.png'
import pizza_large from '../Main/img/pizza-large.png'
import pizza_all from '../Main/img/pizza-all.png'
import pizza_1 from '../Main/img/ingredients/pizza1.png'
import pizza_2 from '../Main/img/ingredients/pizza2.png'
import pizza_3 from '../Main/img/ingredients/pizza3.png'
import pizza_4 from '../Main/img/ingredients/pizza4.png'
import pizza_5 from '../Main/img/ingredients/pizza5.png'
import pizza_6 from '../Main/img/ingredients/pizza6.png'
import cola from '../Main/img/ingredients/colapizza.png'
import pizza_cola from '../Main/img/ingredients/pizzacola.png'

const Main = () => {
    const [userData, setUSerData] = useState([]);
    const [userData2, setUSerData2] = useState([]);
    useEffect(() => {
        fetchData();
        fetchData2();
    }, [])


    const fetchData = async () => {
        try {
            const token = localStorage.getItem('Authorisation');
            const role = localStorage.getItem('Role');
            console.log(role)
            const result = await axios({
                    url: 'http://127.0.0.1:25000/category',
                    method: 'get',

                })
            ;

            // handle success
            //console.  log(result.data);
            console.log(result.data)
            setUSerData(result.data)
        } catch (err) {
            console.log("something Wrong");
        }
    }
    const fetchData2 = async () => {
        try {
            const token = localStorage.getItem('Authorisation');
            const role = localStorage.getItem('Role');
            console.log(role)
            const result = await axios({
                    url: 'http://127.0.0.1:25000/category/type',
                    method: 'get',

                })
            ;

            // handle success
            //console.  log(result.data);
            console.log(result.data)
            setUSerData2(result.data)
        } catch (err) {
            console.log("something Wrong");
        }
    }
    const fetchData3 = async (e, id) => {
        try {
            const token = localStorage.getItem('Authorisation');
            const role = localStorage.getItem('Role');
            console.log(role)
            const result = await axios({
                    url: 'http://127.0.0.1:25000/category/product/get/'+ id,
                    method: 'get'

                })
            ;

            // handle success
            //console.  log(result.data);
            console.log(result.data)
            setUSerData(result.data)
        } catch (err) {
            console.log("something Wrong");
        }
    }


    return (
        <body className={main.body}>
        <header>
        <h2>
            <a href="/">
                <img src={logo} alt="Pizza Image" /> The
                <span className={`${main["highlight"]} ${main.red_naw}`}>Pizza</span>
            </a>
        </h2>
            <nav>
            <ul>
                <li className="current">
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="#benefits">Benefits</a>
                </li>
                <li>
                    <a href="#customize">Types</a>
                </li>
                <li>
                    <a href="#testimonials">Quotes</a>
                </li>
                <li>
                    <a href="/auth/login">
                        <span className={`highlight ${main.red_naw}`}>Login</span>
                    </a>
                </li>
            </ul>
        </nav>

        </header>

         <section className={main.section_margin}>
        <h1 className={main.h1}>Welcome to The Pizza Page</h1>
        <h3 className={main.h3}>the cure to all hunger cravings is hidden inside
            <span className={main.red_naw}>the Pizza&trade;</span>
        </h3>

        <div id="showcase-image">
            <img src={pizza_large} className={main.pizza} alt="Pizza"/>
        </div>
        <a href="#benefits" className={main.button_more}>Read More...</a>

    </section>

        <section id="benefits" className={main.section_white}>

        <h1 className={main.h1_night}>Benefits of eating
            <span className={main.red_naw}>Pizza&trade;</span>
        </h1>


        <div className={main.grid}>
        </div>
        <div className={''}>
  <div className={main.text}>
     <div id="benefits-list" className={main.left}>
                <ul>
                    <li>
                        <p className={main.h5_black}>
                             Pizza is a good way to increase your
                            <strong>calcium</strong> intake for the day.</p>
                    </li>
                    <li>
                        <p className={main.h5_black}>
                            <i className="fa fa-arrow-right"></i> Eating pizza will also help you get the
                            <strong>protein</strong> you need for building muscle and other tissues in your body.</p>
                    </li>
                    <li>
                        <p className={main.h5_black}>
                            <i className="fa fa-arrow-right"></i> You should eat 2 to 3 cups of
                            <strong>vegetables</strong> each day, and ordering a pizza loaded with vegetables is a delicious way
                            to add to your day's vegetable intake.</p>
                    </li>
                    <li>
                        <p className={main.h5_black}>
                            <i className="fa fa-arrow-right"></i> If you eat a pizza with a
                            <strong>whole-grain</strong> crust, it will also help you meet your recommended intake of at least three
                            servings of whole grains per day.</p>
                    </li>
                    <li>
                        <p className={main.h5_black}>
                            <i className="fa fa-arrow-right"></i> There's a key ingredient in tomato sauce called lycopene, which can help
                            <strong>fight cancer</strong>.</p>
                    </li>
                    <li>
                        <p className={main.h5_black}>
                            <i className="fa fa-arrow-right"></i> The sauce is actually loaded with
                            <strong>Vitamin C</strong>, which your body needs to prevent illnesses such as the common cold.</p>
                    </li>
                </ul>

            </div>
  </div>

  <div className={main.images}>
    <img src={pizza_all}/>

  </div>
</div>
    </section>

            <section id="customize">
                <div className={main.category}>
                    <input type="submit" className={` ${main.display_flex}`}
                           value="All"
                           onClick={e => fetchData(e)}/>
                { userData2.map((user, i) => {
                        return (
                            <input type="submit" className={` ${main.display_flex}`}
                                   value={user.category_type.charAt(0).toUpperCase() + user.category_type.slice(1)}
                                   onClick={e => fetchData3(e, user.id)}/>


                        )})}
                    </div>
                <div className={main['cards']}>

                {
                    userData.map((user, i) => {
                        return (

                            <div className={main["card"]}>
                                <div className={main["card__top"]}>
                                    <a href="#" className={main["card__image"]}>
                                          {user.img === undefined
    ? <>< />
    :  <img src={require(`../Main/img/server_img/${user.img}`)} alt="" className={main.images_small}/> }
                                    </a>
                {user.discount === 0
    ? <>< />
    : <div className={main["card__label"]}>-{user.discount}%</div>}


                                </div>

                            <div className={main["card__bottom"]}>
                                <div className={main["card__prices"]}>
      <div className={`${main.card__price} ${main['card__price--common']}`}>{user.price}</div>
                                    {user.discount === 0
    ? <>< />
    : <div className={`${main.card__price} ${main['card__price--discount']}`}>{user.price * (100- user.discount)/100}</div>}

    </div>
                            </div>
                                 <a href="#" className={main["card__title"]}>
                                     {user.description}
    </a>

    <button className={main["card__add"]}>В корзину</button>
                            </div>



                           )
                }
                    )

                }
    </div>
    </section>


        </body>


    )
};
export default Main;

