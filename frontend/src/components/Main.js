import React, {useState} from "react";

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
    const [userField, setUserField] = useState({
        email: "",
        password: ""
    });

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        //console.log(userField);

    }
    const [loading, setLoading] = useState()

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const responce = await axios.post("http://127.0.0.1:25000/auth/login", userField);
            console.log(responce)

            setLoading(true);
            var response_answer = await responce
            var access_token = response_answer['data']['access_token']
            var role = response_answer['data']['role']
            localStorage.setItem('Authorisation', access_token);
            localStorage.setItem('Role', role);
        } catch (err) {
            console.log("Something Wrong");
        }
    }
    if (loading) {
        return <Main/>
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
                <div className={main['cards']}>
            <div className={main["card"]}>


                 <div className={main["card__top"]}>

    <a href="#" className={main["card__image"]}>
      <img
        src={pizza_3}
        alt="Pizza"
        className={main.images_small}
      />
    </a>
    <div className={main["card__label"]}>-10%</div>
  </div>

  <div className={main["card__bottom"]}>
    <div className={main["card__prices"]}>
      <div className={`${main.card__price} ${main['card__price--common']}`}>1 000</div>
      <div className={`${main.card__price} ${main['card__price--discount']}`}>900</div>
    </div>

    <a href="#" className={main["card__title"]}>
      Pepper, mushrooms, cheese
    </a>

    <button className={main["card__add"]}>В корзину</button>


  </div>
            </div>
                   <div className={main["card"]}>


                 <div className={main["card__top"]}>

    <a href="#" className={main["card__image"]}>
      <img
        src={pizza_4}
        alt="Pizza"
        className={main.images_small}
      />
    </a>
    <div className={main["card__label"]}>-15%</div>
  </div>

  <div className={main["card__bottom"]}>
    <div className={main["card__prices"]}>
      <div className={`${main.card__price} ${main['card__price--common']}`}>1 200</div>
      <div className={`${main.card__price} ${main['card__price--discount']}`}>1 000</div>
    </div>

    <a href="#" className={main["card__title"]}>
      Pepper, mushrooms, cheese
    </a>

    <button className={main["card__add"]}>В корзину</button>


  </div>
                   </div>
                                   <div className={main["card"]}>


                 <div className={main["card__top"]}>

    <a href="#" className={main["card__image"]}>
      <img
        src={pizza_5}
        alt=""
        className={main.images_small}
      />
    </a>

  </div>

  <div className={main["card__bottom"]}>
    <div className={main["card__prices"]}>
      <div className={`${main.card__price} ${main['card__price--common']}`}>1 500</div>
      <div className={`${main.card__price} ${main['card__price--discount']}`}>1 400</div>
    </div>

    <a href="#" className={main["card__title"]}>
      Pepper, mushrooms, cheese
    </a>

    <button className={main["card__add"]}>В корзину</button>


  </div>
                   </div>
                                   <div className={main["card"]}>


                 <div className={main["card__top"]}>

    <a href="#" className={main["card__image"]}>
      <img
        src={pizza_1    }
        alt=""
        className={main.images_small}
      />
    </a>
    <div className={main["card__label"]}>-10%</div>
  </div>

  <div className={main["card__bottom"]}>
    <div className={main["card__prices"]}>
      <div className={`${main.card__price} ${main['card__price--common']}`}>1 500</div>
      <div className={`${main.card__price} ${main['card__price--discount']}`}>1 300</div>
    </div>

    <a href="#" className={main["card__title"]}>
      Pepper, mushrooms, cheese
    </a>

    <button className={main["card__add"]}>В корзину</button>


  </div>
                   </div>
                                   <div className={main["card"]}>


                 <div className={main["card__top"]}>

    <a href="#" className={main["card__image"]}>
      <img
        src={pizza_6}
        alt=""
        className={main.images_small}
      />
    </a>
    <div className={main["card__label"]}>-10%</div>
  </div>

  <div className={main["card__bottom"]}>
    <div className={main["card__prices"]}>
      <div className={`${main.card__price} ${main['card__price--common']}`}>1 350</div>
      <div className={`${main.card__price} ${main['card__price--discount']}`}>1 200</div>
    </div>

    <a href="#" className={main["card__title"]}>
      Pepper, mushrooms, cheese
    </a>

    <button className={main["card__add"]}>В корзину</button>


  </div>
                   </div>

    </div>




    </section>


        </body>


    )
};
export default Main;

