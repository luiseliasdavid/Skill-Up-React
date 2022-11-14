import React from "react";
import "./Footer.css";

export const Footer = () => {
    const developers = [
        {
            name: "Daiana Gimenez",
            linkedin: "",
        },
        {
            name: "Santiago Zibecchini",
            linkedin: "https://www.linkedin.com/in/santiago-zibecchi-7996971a5/",
        },
        {
            name: "Tobias Zavallo",
            linkedin: "https://www.linkedin.com/in/tobias-zavallo-066994222/",
        },
        {
            name: "Lucas Cabral Silvero",
            linkedin: "https://www.linkedin.com/in/lucas-cabral-silvero/",
        },
        {
            name: "Juan Gutierrez",
            linkedin: "https://www.linkedin.com/in/juangutierrezmonaco/",
        },
        {
            name: "Facundo N. Alvarez",
            linkedin: "https://www.linkedin.com/in/facundon-alvarez/",
        },
        {
            name: "Luis David",
            linkedin: "",
        },
    ];

    return (
        <footer className="footer">
            <ul id="footer-list" className="list-group list-group-horizontal ">
                <li className="list-group-item">SkillUp - Noviembre 2022</li>
                {developers.map((dev, i) => {
                    return (
                        <li
                            className="list-group-item"
                            style={{ textDecoration: "none" }}
                            key={i}
                        >
                            <a
                                href={`${dev.linkedin}`}
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
