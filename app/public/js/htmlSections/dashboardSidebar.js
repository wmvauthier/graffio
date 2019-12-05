function setDashboardSidebar(mainDashBoard) {

    var div = document.createElement("div");

    div.innerHTML = `        <div class="nav-left-sidebar sidebar-dark">
                                <div class="menu-list">
                                    <nav class="navbar navbar-expand-lg navbar-light">
                                        <a class="d-xl-none d-lg-none" href="#">Menu</a>
                                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                        <div class="collapse navbar-collapse" id="navbarNav">
                                            <ul class="navbar-nav flex-column">
                                                <li class="nav-divider">
                                                    Dashboards
                                                </li>
                                                <li class="nav-item ">
                                                    <a class="nav-link" href="./dashboard_Courtyard">
                                                        <i class="fa fa-fw fa-car"></i>Pátios 
                                                    </a>
                                                </li>
                                                <li class="nav-divider">
                                                    Gerencial
                                                </li>
                                                <li class="nav-item ">
                                                    <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false"
                                                        data-target="#submenu-register" aria-controls="submenu-register"><i
                                                            class="fa fa-fw fa-user-circle"></i>Cadastros <span
                                                            class="badge badge-success">6</span></a>
                                                    <div id="submenu-register" class="collapse submenu">
                                                        <ul class="nav flex-column">
                                                            <li class="nav-item">
                                                                <a class="nav-link" href="./gerencial_Affiliate">Afiliados</a>
                                                            </li>
                                                            <li class="nav-item">
                                                                <a class="nav-link" href="./gerencial_User">Usuários</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li class="nav-item ">
                                                    <a class="nav-link" href="./gerencial_Movement">
                                                        <i class="fa fa-fw fa-chart-line"></i>Movimento 
                                                    </a>
                                                </li>
                                                <li class="nav-divider">
                                                    Configurações
                                                </li>
                                                <li class="nav-item ">
                                                    <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false"
                                                        data-target="#submenu-parking" aria-controls="submenu-parking"><i
                                                            class="fa fa-fw fa-taxi"></i>Estacionamento <span
                                                            class="badge badge-success">6</span></a>
                                                    <div id="submenu-parking" class="collapse submenu">
                                                        <ul class="nav flex-column">
                                                            <li class="nav-item ">
                                                                <a class="nav-link" href="./config_dataclient">
                                                                    Dados do Cliente 
                                                                </a>
                                                            </li>
                                                            <li class="nav-item ">
                                                                <a class="nav-link" href="./config_Courtyard">
                                                                    Pátios 
                                                                </a>
                                                            </li>
                                                            <li class="nav-item ">
                                                                <a class="nav-link" href="./config_Terminal">
                                                                    Terminais 
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li class="nav-item ">
                                                    <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false"
                                                        data-target="#submenu-payment" aria-controls="submenu-payment"><i
                                                            class="fa fa-fw fa-dollar-sign"></i>Formas de Pagamento <span
                                                            class="badge badge-success">6</span></a>
                                                    <div id="submenu-payment" class="collapse submenu">
                                                        <ul class="nav flex-column">
                                                            <li class="nav-item">
                                                                <a class="nav-link" href="./config_priceTable">
                                                                    Tabelas de Preço
                                                                </a>
                                                            </li>
                                                            <li class="nav-item">
                                                                <a class="nav-link" href="./config_priceTableAux">
                                                                    Tabelas Auxiliares
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </div>`;

    mainDashBoard.appendChild(div);

}