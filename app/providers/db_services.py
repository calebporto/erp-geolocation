from json import dumps
from math import acos, cos, radians, sin
from app import db
from app.models.basemodels import Register_Response_, Spot_Commercial_For_View_, Spot_For_View_, Spot_Private_For_View_
from app.models.tables import Spot, Spot_Commercial_Info, Spot_Private_Info
from sqlalchemy import or_
from sqlalchemy.sql.functions import func

def get_pontos(filtros):
        query = Spot.query\
            .join(Spot_Commercial_Info, Spot.id == Spot_Commercial_Info.spot_id)\
            .join(Spot_Private_Info, Spot.id == Spot_Private_Info.spot_id)\
            .add_columns(Spot_Commercial_Info, Spot_Private_Info)

        codigo = filtros['codigo']
        pais = filtros['pais']
        estado = filtros['estado']
        cidade = filtros['cidade']
        zona = filtros['zona']
        bairro = filtros['bairro']
        endereco = filtros['endereco']
        formato = filtros['formato']
        empresa = filtros['empresa']
        if len(codigo) > 0:
            if len(codigo) == 1:
                query = query.filter(Spot.code == codigo[0])
            else:
                items = [Spot.code == term for term in codigo]
                query = query.filter(or_(*items))
        if len(pais) > 0:
            if len(pais) == 1:
                query = query.filter(Spot.country == pais[0])
            else:
                items = [Spot.country == term for term in pais]
                query = query.filter(or_(*items))
        if len(estado) > 0:
            if len(estado) == 1:
                query = query.filter(Spot.state == estado[0])
            else:
                items = [Spot.state == term for term in estado]
                query = query.filter(or_(*items))
        if len(cidade) > 0:
            if len(cidade) == 1:
                query = query.filter(Spot.city.like('%'+ cidade[0] +'%'))
            else:
                items = [Spot.city.like('%'+ term +'%') for term in cidade]
                query = query.filter(or_(*items))
        if len(zona) > 0:
            if len(zona) == 1:
                query = query.filter(Spot.zone == zona[0])
            else:
                items = [Spot.zone == term for term in zona]
                query = query.filter(or_(*items))
        if len(bairro) > 0:
            if len(bairro) == 1:
                query = query.filter(Spot.district == bairro[0])
            else:
                items = [Spot.district == term for term in bairro]
                query = query.filter(or_(*items))
        if len(endereco) > 0:
            if len(endereco) == 1:
                query = query.filter(Spot.address == endereco[0])
            else:
                items = [Spot.address == term for term in endereco]
                query = query.filter(or_(*items))
        if len(formato) > 0:
            if len(formato) == 1:
                query = query.filter(Spot.format.like(f'%{formato[0]}%'))
            else:
                items = [Spot.format.like(f'%{term}%') for term in formato]
                query = query.filter(or_(*items))
        if len(empresa) > 0:
            if len(empresa) == 1:
                query = query.filter(Spot_Private_Info.empresa == empresa[0])
            else:
                items = [Spot_Private_Info.empresa == term for term in empresa]
                query = query.filter(or_(*items))
        
        count = query.count()
        
        if int(filtros['id']) > 0:
            query = query.filter(Spot.id > int(filtros['id']))

        
        query = query.limit(50).all()
        pontos = []
        for item in query:
            ponto = {}
            basic_info = Spot_For_View_(
                id=item[0].id,
                code=item[0].code,
                address=item[0].address,
                latitude=item[0].latitude,
                longitude=item[0].longitude,
                image_link=item[0].image_link,
                include_date=item[0].include_date,
                reference=item[0].reference,
                district=item[0].district,
                city=item[0].city,
                zone=item[0].zone,
                state=item[0].state,
                country=item[0].country,
                format=item[0].format,
                measure=item[0].measure
            )
            ponto['basic'] = basic_info.dict()
            commecial_info = Spot_Commercial_For_View_(
                id=item[1].id,
                spot_id=item[1].spot_id,
                impacto=item[1].impacto,
                valor_tabela_comm=item[1].valor_tabela_comm,
                valor_negociado_comm=item[1].valor_negociado_comm,
                producao=item[1].producao,
                observacoes=item[1].observacoes,
                outros=item[1].outros
            )
            ponto['commercial'] = commecial_info.dict()
            private_info = Spot_Private_For_View_(
                id=item[2].id,
                spot_id=item[2].spot_id,
                empresa=item[2].empresa,
                valor_negociado_int=item[2].valor_negociado_int,
                custo_liq=item[2].custo_liq,
                medida_int=item[2].medida_int,
                observacoes=item[2].observacoes,
                outros=item[2].outros
            )
            ponto['private'] = private_info.dict()
            pontos.append(ponto)
        response = {
            'length': count,
            'pontos': pontos
        }
        return dumps(response, default=str)

def get_pontos_by_id_list(id_list):
    query = Spot.query\
    .join(Spot_Commercial_Info, Spot.id == Spot_Commercial_Info.spot_id)\
    .join(Spot_Private_Info, Spot.id == Spot_Private_Info.spot_id)\
    .add_columns(Spot_Commercial_Info, Spot_Private_Info)\
    .filter(Spot.id.in_(id_list)).all()
    

    return query

def edit_pontos(lang, dados):
    messages = []
    try:
        query = Spot.query\
                .join(Spot_Commercial_Info, Spot.id == Spot_Commercial_Info.spot_id)\
                .join(Spot_Private_Info, Spot.id == Spot_Private_Info.spot_id)\
                .add_columns(Spot_Commercial_Info, Spot_Private_Info)\
                .filter(Spot.id == dados['id'])\
                .first()
        basic = query[0]
        commercial = query[1]
        private = query[2]

        basic.code = dados['code']
        basic.address = dados['address']
        basic.latitude = dados['latitude']
        basic.longitude = dados['longitude']
        basic.image_link = dados['image_link']
        basic.reference = dados['reference']
        basic.district = dados['district']
        basic.city = dados['city']
        basic.zone = dados['zone']
        basic.state = dados['state']
        basic.country = dados['country']
        basic.format = dados['format']
        basic.measure = dados['code']

        commercial.impacto = dados['impacto']
        commercial.valor_tabela_comm = dados['valor_tabela_comm']
        commercial.valor_negociado_comm = dados['valor_negociado_comm']
        commercial.producao = dados['producao']
        commercial.observacoes = dados['observacoes_comm']
        commercial.outros = dados['outros_comm']

        private.empresa = dados['empresa']
        private.valor_negociado_int = dados['valor_negociado_int']
        private.custo_liq = dados['custo_liq']
        private.medida_int = dados['medida_int']
        private.observacoes = dados['observacoes_int']
        private.outros = dados['outros_int']

        db.session.add(basic)
        db.session.add(commercial)
        db.session.add(private)
        db.session.commit()

        if lang == 'es' or lang == 'es-ar':
            messages.append('Registro cambiado con éxito.')
        elif lang == 'en':
            messages.append('Registration changed successfully.')
        else:
            messages.append('Cadastro alterado com sucesso.')
        response = Register_Response_(
            status=True,
            message=messages
        )
        return response.json()
    except Exception as error:
        print(str(error))
        if lang == 'es' or lang == 'es-ar':
            messages.append('Erro en servidor.')
        elif lang == 'en':
            messages.append('Server error.')
        else:
            messages.append('Erro no servidor.')
        response = Register_Response_(
            status=False,
            message=messages
        )
        return response.json()
    
def delete_ponto(lang, id):
    messages = []
    try:
        query = Spot.query\
                .filter(Spot.id == id)\
                .first()
        db.session.delete(query)
        db.session.commit()
        if lang == 'es' or lang == 'es-ar':
            messages.append('Registro eliminado con éxito.')
        elif lang == 'en':
            messages.append('Registration deleted successfully.')
        else:
            messages.append('Cadastro excluído com sucesso.')
        response = Register_Response_(
            status=True,
            message=messages
        )
        return response.json()
    except Exception as error:
        print(str(error))
        if lang == 'es' or lang == 'es-ar':
            messages.append('Erro en servidor.')
        elif lang == 'en':
            messages.append('Server error.')
        else:
            messages.append('Erro no servidor.')
        response = Register_Response_(
            status=False,
            message=messages
        )
        return response.json()
    
def delete_pontos(lang, idList):
    messages = []
    query = Spot.query.filter(Spot.id.in_(idList)).all()
    for spot in query:
        db.session.delete(spot)
    db.session.commit()
    
    if lang == 'es' or lang == 'es-ar':
        messages.append('Puntos removidos con exito.')
    elif lang == 'en':
        messages.append('Points deleted successfully.')
    else:
        messages.append('Pontos removidos com sucesso.')
    response = Register_Response_(
        status=True,
        message=messages
    )
    return response.json()

def get_point_in_radius(lat, lng, radius):
    earth_radius = 6371

    query = Spot.query\
            .join(Spot_Commercial_Info, Spot.id == Spot_Commercial_Info.spot_id)\
            .join(Spot_Private_Info, Spot.id == Spot_Private_Info.spot_id)\
            .add_columns(Spot_Commercial_Info, Spot_Private_Info)\
            .filter((
                earth_radius *\
                func.acos(
                    func.cos(func.radians(lat)) *\
                    func.cos(func.radians(Spot.latitude)) *\
                    func.cos(func.radians(lng) - func.radians(Spot.longitude)) +\
                    func.sin(func.radians(lat)) *\
                    func.sin(func.radians(Spot.latitude))
                )
            ) <= radius)
    count = query.count()
    query = query.all()
    pontos = []
    for item in query:
        ponto = {}
        basic_info = Spot_For_View_(
            id=item[0].id,
            code=item[0].code,
            address=item[0].address,
            latitude=item[0].latitude,
            longitude=item[0].longitude,
            image_link=item[0].image_link,
            include_date=item[0].include_date,
            reference=item[0].reference,
            district=item[0].district,
            city=item[0].city,
            zone=item[0].zone,
            state=item[0].state,
            country=item[0].country,
            format=item[0].format,
            measure=item[0].measure
        )
        ponto['basic'] = basic_info.dict()
        commecial_info = Spot_Commercial_For_View_(
            id=item[1].id,
            spot_id=item[1].spot_id,
            impacto=item[1].impacto,
            valor_tabela_comm=item[1].valor_tabela_comm,
            valor_negociado_comm=item[1].valor_negociado_comm,
            producao=item[1].producao,
            observacoes=item[1].observacoes,
            outros=item[1].outros
        )
        ponto['commercial'] = commecial_info.dict()
        private_info = Spot_Private_For_View_(
            id=item[2].id,
            spot_id=item[2].spot_id,
            empresa=item[2].empresa,
            valor_negociado_int=item[2].valor_negociado_int,
            custo_liq=item[2].custo_liq,
            medida_int=item[2].medida_int,
            observacoes=item[2].observacoes,
            outros=item[2].outros
        )
        ponto['private'] = private_info.dict()
        pontos.append(ponto)
    response = {
        'length': count,
        'pontos': pontos
    }
    return dumps(response, default=str)