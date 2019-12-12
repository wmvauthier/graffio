function setDashboardHeader(mainDashBoard) {

    var token = localStorage.getItem("token");

    var div = document.createElement("div");
    div.innerHTML = `<div class="dashboard-header">
    <nav class="navbar navbar-expand-lg bg-white fixed-top">
        <a class="navbar-brand" href="./home">Graffio</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto navbar-right-top">
                <li class="nav-item dropdown notification">
                    <a class="nav-link nav-icons" href="#" id="navbarDropdownMenuLink1" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false"><i class="fas fa-fw fa-bell"></i> <span
                            class="indicator"></span></a>
                    <ul class="dropdown-menu dropdown-menu-right notification-dropdown">
                        <li>
                            <div class="notification-title">Notificações</div>
                            <div class="notification-list">
                                <div class="list-group">
                                    <a href="#" class="list-group-item list-group-item-action active">
                                        <div class="notification-info">
                                            <div class="notification-list-user-img"><img
                                                    src="assets/images/avatar-2.jpg" alt=""
                                                    class="user-avatar-md rounded-circle"></div>
                                            <div class="notification-list-user-block"><span
                                                    class="notification-list-user-name">Jeremy
                                                    Rakestraw</span>accepted your invitation to join the team.
                                                <div class="notification-date">2 min ago</div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">
                                        <div class="notification-info">
                                            <div class="notification-list-user-img"><img
                                                    src="assets/images/avatar-3.jpg" alt=""
                                                    class="user-avatar-md rounded-circle"></div>
                                            <div class="notification-list-user-block"><span
                                                    class="notification-list-user-name">John Abraham </span>is
                                                now following you
                                                <div class="notification-date">2 days ago</div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">
                                        <div class="notification-info">
                                            <div class="notification-list-user-img"><img
                                                    src="assets/images/avatar-4.jpg" alt=""
                                                    class="user-avatar-md rounded-circle"></div>
                                            <div class="notification-list-user-block"><span
                                                    class="notification-list-user-name">Monaan Pechi</span> is
                                                watching your main repository
                                                <div class="notification-date">2 min ago</div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">
                                        <div class="notification-info">
                                            <div class="notification-list-user-img"><img
                                                    src="assets/images/avatar-5.jpg" alt=""
                                                    class="user-avatar-md rounded-circle"></div>
                                            <div class="notification-list-user-block"><span
                                                    class="notification-list-user-name">Jessica
                                                    Caruso</span>accepted your invitation to join the team.
                                                <div class="notification-date">2 min ago</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="list-footer"> <a href="#">View all notifications</a></div>
                        </li>
                    </ul>
                </li>
                <li class="nav-item dropdown connection">
                    <a class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false"> <i class="fas fa-fw fa-th"></i> </a>
                    <ul class="dropdown-menu dropdown-menu-right connection-dropdown">
                        <li class="connection-list">
                            <div class="row">
                                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                    <a href="#" class="connection-item"><img src="assets/images/github.png"
                                            alt=""> <span>Github</span></a>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                    <a href="#" class="connection-item"><img src="assets/images/dribbble.png"
                                            alt=""> <span>Dribbble</span></a>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                    <a href="#" class="connection-item"><img src="assets/images/dropbox.png"
                                            alt=""> <span>Dropbox</span></a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                    <a href="#" class="connection-item"><img src="assets/images/bitbucket.png"
                                            alt=""> <span>Bitbucket</span></a>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                    <a href="#" class="connection-item"><img src="assets/images/mail_chimp.png"
                                            alt=""><span>Mail chimp</span></a>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                    <a href="#" class="connection-item"><img src="assets/images/slack.png"
                                            alt=""> <span>Slack</span></a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="conntection-footer"><a href="#">More</a></div>
                        </li>
                    </ul>
                </li>
                <!-- NAV-USER -->
                <li class="nav-item dropdown nav-user">
                    <a class="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img
                            src="assets/images/avatar-1.jpg" alt="" class="user-avatar-md rounded-circle"></a>
                    <div class="dropdown-menu dropdown-menu-right nav-user-dropdown"
                        aria-labelledby="navbarDropdownMenuLink2">
                        <div class="nav-user-info">
                            <h5 id="loggedUserNome" class="mb-0 text-white nav-user-name"></h5>
                            <span id="loggedUserCargo" class="status"></span><span class="ml-2"></span>
                        </div>
                        <a class="dropdown-item" href="#" onclick="setProfile('${token}');"><i class="fas fa-user mr-2"></i>Perfil</a>
                        <a class="dropdown-item" href="#"><i class="fas fa-cog mr-2"></i>Configurações</a>
                        <a class="dropdown-item" href="#" onclick="logout('${token}');"><i class="fas fa-power-off mr-2"></i>Sair</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    </div>

    <!-- Modal para Edição de Usuários -->
    <div class="modal fade" id="updateNavUserModal" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Insira as Novas Informações do Usuário</h4>
                </div>
                <div class="modal-body">
                    <form id="updateNavUserForm">
                        <div class="form-group">
                            <label for="id" class="col-form-label">ID</label>
                            <input id="id_navUserUpd" disabled type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="nome" class="col-form-label">Nome</label>
                            <input id="navNomeUpd" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="cargo" class="col-form-label">Cargo</label>
                            <input id="navCargoUpd" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="user_login" class="col-form-label">Login</label>
                            <input id="navUser_loginUpd" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="user_senha" class="col-form-label">Senha</label>
                            <input id="navUser_senhaUpd" type="password" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="nivel_acesso" class="col-form-label">Nível de Acesso</label>
                            <select id="navNivel_acessoUpd" class="form-control">
                                <option disabled selected>Selecione o Nível de Acesso</option>
                                <option>Link</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button id="btnDAOUpdateNavUser"  type="button" class="btn btn-rounded btn-success">Alterar</button>
                    <button type="button" class="btn btn-rounded btn-danger"
                        data-dismiss="modal">Cancelar</button>
                </div>
            </div>

        </div>
    </div>

`;

    mainDashBoard.appendChild(div);

}