// CSS
import "./AboutUs.css";

// Components
import Banner from "../../components/Banner/Banner";

const AboutUs = () => {
    return (
        <>
            <Banner title="QUEM SOMOS" />
            <section id="section-about-us">
                <div className="container">
                    <div className="block-wrap">
                        <h3 className="block-header">A nossa Missão</h3>
                        <div className="block-content-wrap">
                            <p>
                                Encontrar as soluções mais propícias à situação
                                de cada cliente, contribuir para melhorar a
                                qualidade de vida no âmbito da concretização de
                                negócios, como a venda, compra e/ou
                                arrendamento. Proporcionar aos nossos clientes
                                todo o préstimo que necessitam na pesquisa ou
                                divulgação do imóvel que procuram ou pretendem
                                vender e/ ou arrendar. A Villa View tem para
                                oferecer sempre o melhor, porque estamos certos
                                que no momento das grandes decisões, todos os
                                pormenores são importantes.
                            </p>
                        </div>
                    </div>
                    <div className="block-wrap">
                        <h3 className="block-header">A nossa Visão</h3>
                        <div className="block-content-wrap">
                            <p>
                                “Ser a Empresa de referência, reconhecida como a
                                melhor escolha por parte dos nossos clientes,
                                pelos nossos serviços de excelência, é para nós
                                este o melhor reconhecimento daquilo que melhor
                                sabemos fazer – servir o cliente. Pretendemos
                                cada vez mais ser uma marca de qualidade e de
                                grande profissionalismo no mercado em que nos
                                inserimos, passo a passo rumo ao crescimento é a
                                nossa direção. Cada vez mais queremos estar
                                próximos de Si.“
                            </p>
                        </div>
                    </div>
                    <div className="block-wrap">
                        <h3 className="block-header">Os nossos Valores</h3>
                        <div className="block-content-wrap">
                            <p>
                                Transparência - Relacionamo-nos de forma aberta
                                e honesta com todos os nossos clientes.
                                Profissionalismo – Apresentamos pessoas
                                experientes nas nossas áreas de atuação, a Villa
                                View assume-se como perita no seu trabalho.
                                Rigor - Trabalhamos de acordo com a lei,
                                garantindo sempre ao cliente assertividade e
                                credibilidade nos processos que desenvolvemos.
                                Ética - De acordo com o Código Deontológico da
                                Área de Mediação Imobiliária existem vários
                                princípios, estes são conhecidos e respeitados
                                pela Villa View, entre eles o da « Boa Fé
                                Comercial ». Integridade - Realizamos os nossos
                                serviços de forma honesta. Só prometemos o que
                                conseguimos cumprir.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
