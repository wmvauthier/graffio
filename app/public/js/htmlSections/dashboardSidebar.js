function setDashboardSidebar(mainDashBoard) {

    var div = document.createElement("div");
    
    div.innerHTML = `        <div class="nav-left-sidebar sidebar-dark">
                                <div class="menu-list">
                                    <nav class="navbar navbar-expand-lg navbar-light">
                                        <a class="d-xl-none d-lg-none" href="#">Dashboard</a>
                                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                        <div class="collapse navbar-collapse" id="navbarNav">
                                            <ul class="navbar-nav flex-column">
                                                <li class="nav-divider">
                                                    Dashboards
                                                </li>
                                                <li class="nav-divider">
                                                    Gerencial
                                                </li>
                                                <li class="nav-item ">
                                                    <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false"
                                                        data-target="#submenu-15" aria-controls="submenu-15"><i
                                                            class="fa fa-fw fa-user-circle"></i>Cadastros <span
                                                            class="badge badge-success">6</span></a>
                                                    <div id="submenu-15" class="collapse submenu">
                                                        <ul class="nav flex-column">
                                                            <li class="nav-item">
                                                                <a class="nav-link" href="#">Usuários</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li class="nav-divider">
                                                    Configurações
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </div>`;

    mainDashBoard.appendChild(div);

}