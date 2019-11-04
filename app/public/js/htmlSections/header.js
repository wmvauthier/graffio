function setPageHeader(header,title) {

    var div = document.createElement("div");
    
    div.innerHTML = `<div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="page-header">
                                <h2 class="pageheader-title">${title}</h2>
                            </div>
                        </div>
                    </div>`;

    header.appendChild(div);

}