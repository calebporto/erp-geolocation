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
export class Ponto_Basic {
    constructor(id, code, address, latitude, longitude, image_link, reference, district, city, zone, state, country, format, measure) {
        this.id = id
        this.code = code
        this.address = address
        this.latitude = latitude
        this.longitude = longitude
        this.image_link = image_link
        this.reference = reference
        this.district = district
        this.city = city
        this.zone = zone
        this.state = state
        this.country = country
        this.format = format
        this.measure = measure
    }
}
export class Ponto_Commercial {
    constructor(id, spot_id, impacto, valor_tabela_comm, valor_negociado_comm, producao, observacoes, outros) {
        this.id = id
        this.spot_id = spot_id
        this.impacto = impacto
        this.valor_tabela_comm = valor_tabela_comm
        this.valor_negociado_comm = valor_negociado_comm
        this.producao = producao
        this.observacoes = observacoes
        this.outros = outros
    }
}
export class Ponto_Private {
    constructor(id, spot_id, empresa, valor_negociado_int, custo_liq, medida_int, observacoes, outros) {
        this.id = id
        this.spot_id = spot_id
        this.empresa = empresa
        this.valor_negociado_int = valor_negociado_int
        this.custo_liq = custo_liq
        this.medida_int = medida_int
        this.observacoes = observacoes
        this.outros = outros
    }
}
export class ItemProposta {
    constructor(media = null, place = null, book = null, period = null, format = null,
                faces = null, periodQuant = null, tabValue = null, negValue = null, production = null) {
        this.media = media
        this.place = place
        this.book = book
        this.period = period
        this.format = format
        this.faces = faces
        this.periodQuant = periodQuant
        this.tabValue = tabValue
        this.negValue = negValue
        this.production = production
        this.totalNegValue = null
        this.totalProduction = null
        this.total = null
        this.taxTabValue = null
        this.taxNegValue = null
        this.taxTotalNegValue = null
        this.taxTotal = null
    }

    calcularTotais() {
        this.totalNegValue = this.negValue * this.faces * this.periodQuant
        this.totalProduction = this.production * this.faces
        this.total = this.totalNegValue + this.totalProduction
    }
    calcularComissao(comissao) {
        this.taxTabValue = this.tabValue + (this.tabValue * comissao / 100)
        this.taxNegValue = this.negValue + (this.negValue * comissao / 100)
        this.taxTotalNegValue = this.totalNegValue + (this.totalNegValue * comissao / 100)
        this.taxTotal = this.totalProduction + this.taxTotalNegValue
    }
}
export class Proposta {
    constructor(proposal_date = null, client = null, clientPerson = null, campaign = null, agencyName = null, agencyTax = 0,
                employeeName = null, items = []) {
        this.proposal_date = proposal_date
        this.client = client
        this.clientPerson = clientPerson
        this.campaign = campaign
        this.agencyName = agencyName
        this.agencyTax = agencyTax
        this.employeeName = employeeName
        this.items = items
        this.total = 0
        this.taxTotal = 0
    }
    calcularTotal() {
        this.total = 0
        this.taxTotal = 0
        if (this.items.length > 0) {
            this.items.forEach(item => {
                this.total = Number(this.total) + Number(item.total)
                this.taxTotal = Number(this.taxTotal) + Number(item.taxTotal)
            })
        }
    }
    
}