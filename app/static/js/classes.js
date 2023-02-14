export class Book {
    constructor(id, title, content, creation_date, image_id) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.creation_date = creation_date;
        this.image_id = image_id;
    }
}
export class Fornecedor {
    constructor(id, name, site, person_name, email1, email2, tel1, tel2, relation_level) {
        this.id = id
        this.name = name
        this.site = site
        this.person_name = person_name
        this.email1 = email1
        this.email2 = email2
        this.tel1 = tel1
        this.tel2 = tel2
        this.relation_level = relation_level
    }
}
export class Colaborador {
    constructor(id, name, email, is_admin, is_collaborator) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.is_admin = is_admin
        this.is_collaborator = is_collaborator
    }
}