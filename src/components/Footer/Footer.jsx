import React from "react";
import "./Footer.css";

export const Footer = () => {
    const developers = [
        {
            name: "Daiana Gimenez",
            email: "https://www.linkedin.com/in/daiana-elizabeth-gimenez-3bba02213/",
        },
        {
            name: "Santiago Zibecchi",
            email: "https://www.linkedin.com/in/santiago-zibecchi-7996971a5/",
        },
        {
            name: "Tobias Zavallo",
            email: "https://www.linkedin.com/in/tobias-zavallo-066994222/",
        },
        {
            name: "Lucas Cabral Silvero",
            email: "https://www.linkedin.com/in/lucas-cabral-silvero/",
        },
        {
            name: "Juan Gutierrez",
            email: "https://www.linkedin.com/in/juangutierrezmonaco/",
        },
        {
            name: "Facundo N. Alvarez",
            email: "https://www.linkedin.com/in/facundon-alvarez/",
        },
        {
            name: "Luis David",
            email: "https://www.linkedin.com/in/luis-elias-david",
        },
    ];

    return (
        <footer className="footer">
            <ul id="footer-list" className="list-group list-group-horizontal ">
                <li className="p-2 border border-1">SkillUp - Noviembre 2022</li>
                {developers.map((dev, i) => {
                    return (
                        <li
                            className="p-2 border border-1"
                            style={{ textDecoration: "none" }}
                            key={i}
                        >
                            <a
                                href={`${dev.email}`}
                                rel="noreferrer"
                                target="_blank"
                                className="text-muted"
                            >
                                {dev.name}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </footer>
    );
};

export default Footer;