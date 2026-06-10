from fastapi import APIRouter, Request, Depends, Form
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.usuarios import Usuario
from app.auth import verificar_senha, criar_token

router = APIRouter(prefix="/auth", tags=["Autenticação"])

templates = Jinja2Templates(directory="app/templates")


# Página de Login
@router.get("/login", response_class=HTMLResponse)
async def pagina_login(request: Request):
    return templates.TemplateResponse(
        request,
        "auth/login.html",
        {"request": request}
    )

# Página de Usuários (Admin)
@router.get("/usuarios", response_class=HTMLResponse)
async def pagina_usuarios(request: Request):
    return templates.TemplateResponse(
        request,
        "auth/admin_usuarios.html",
        {"request": request}
    )

# Processar Login
@router.post("/login")
async def fazer_login(
    request: Request,
    email: str = Form(...),
    senha: str = Form(...),
    db: Session = Depends(get_db)
):

    usuario = db.query(Usuario).filter_by(email=email).first()

    senha_correta = (
        usuario is not None and
        verificar_senha(senha, usuario.senha_hash)
    )

    if not senha_correta:
        return templates.TemplateResponse(
            request,
            "login.html",
            {
                "request": request,
                "erro": "Email ou senha incorretos"
            }
        )

    if not usuario.ativo:
        return templates.TemplateResponse(
            request,
            "login.html",
            {
                "request": request,
                "erro": "Usuário inativo. Contate o administrador."
            }
        )

    token_data = {
        "sub": usuario.email,
        "nome": usuario.nome,
        "role": usuario.role,
        "id": usuario.id
    }

    token = criar_token(token_data)

    response = RedirectResponse(
        url="/",
        status_code=302
    )

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        max_age=3600,
        samesite="lax"
    )

    return response


# Logout
@router.get("/logout")
async def sair():

    response = RedirectResponse(
        url="/",
        status_code=302
    )

    response.delete_cookie("access_token")

    return response