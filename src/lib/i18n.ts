export type Language = "pt" | "es";

const translations = {
  pt: {
    // Brand
    "brand.tagline": "MGSIS Tecnologia",

    // Sidebar
    "sidebar.section": "Operação",
    "sidebar.collapse": "Recolher",
    "sidebar.logout": "Sair",

    // Nav
    "nav.dashboard": "Dashboard",
    "nav.clientes": "Clientes",
    "nav.compras": "Compras",
    "nav.resgates": "Resgates",
    "nav.configuracoes": "Configurações",

    // Topbar
    "topbar.search": "Buscar clientes, compras, resgates...",
    "topbar.new-program": "Novo programa",
    "topbar.open-menu": "Abrir menu",
    "topbar.notifications": "Notificações",

    // Login hero (left panel)
    "login.eyebrow": "Programa multi-parceiros",
    "login.hero-heading": "Transforme cada compra em um motivo para voltar.",
    "login.hero-desc":
      "O Siempre Vos conecta o ERP do seu negócio a uma plataforma elegante de cashback e pontos — com retenção mensurável e operação sem fricção.",
    "login.stat1-label": "Retenção",
    "login.stat2-label": "Setup do ERP",
    "login.stat3-label": "Transações",
    "login.hero-tag": "MGSIS TECNOLOGIA · SP · 2026",

    // Login form (right panel)
    "login.form-eyebrow": "Acessar painel",
    "login.form-heading": "Entre na sua conta",
    "login.form-desc":
      "Continue com o e-mail cadastrado. Os campos vêm pré-preenchidos para demonstração.",
    "login.email-label": "E-mail corporativo",
    "login.email-placeholder": "voce@empresa.com",
    "login.password-label": "Senha",
    "login.forgot-password": "Esqueci minha senha",
    "login.remember": "Manter sessão iniciada por 7 dias",
    "login.submit": "Entrar no painel",
    "login.terms-prefix": "Ao continuar, você aceita os",
    "login.terms-link": "Termos de Uso",
    "login.terms-and": "e a",
    "login.privacy-link": "Política de Privacidade",
    "login.terms-suffix": "do Siempre Vos.",
    "login.toast-title": "Bem-vinda de volta",
    "login.toast-desc": "Você está conectada ao Siempre Vos.",
    "login.forgot-toast": "Enviamos um link de recuperação",
    "login.forgot-toast-desc": "Verifique a sua caixa de entrada (mock).",

    // Dashboard
    "dashboard.eyebrow": "Bem-vinda",
    "dashboard.title": "Visão geral do seu programa",
    "dashboard.desc":
      "Acompanhe vendas, recompensas e o engajamento dos seus clientes em um só lugar — com a precisão de um relatório financeiro.",
    "dashboard.view-purchases": "Ver compras",
    "dashboard.adjust-program": "Ajustar programa",
    "dashboard.active-customers": "Clientes ativos",
    "dashboard.total-sold": "Total vendido",
    "dashboard.cashback-generated": "Cashback gerado",
    "dashboard.points-generated": "Pontos gerados",
    "dashboard.redemptions": "Resgates realizados",
    "dashboard.purchases-today": "Compras hoje",
    "dashboard.balance": "Saldo distribuído",
    "dashboard.last-30-days": "últimos 30 dias",
    "dashboard.current-month": "mês corrente",
    "dashboard.processed-erp": "processadas pelo ERP",
    "dashboard.available-redeem": "disponível para resgate",
    "dashboard.chart-eyebrow": "Movimentação · 30 dias",
    "dashboard.chart-title": "Compras & recompensas",
    "dashboard.chart-desc":
      "Volume diário de vendas processadas pelo ERP e o respectivo cashback gerado para os clientes.",
    "dashboard.legend-sales": "Vendas",
    "dashboard.legend-rewards": "Recompensas",
    "dashboard.customers-eyebrow": "Clientes · 6 meses",
    "dashboard.customers-title": "Base ativa",
    "dashboard.customers-desc": "Crescimento da base ativa e aquisição mensal.",
    "dashboard.recent-eyebrow": "Atividade recente",
    "dashboard.recent-title": "Últimas compras recebidas",
    "dashboard.view-all": "Ver todas",
    "dashboard.cashback": "cashback",
    "dashboard.points": "pontos",
    "dashboard.cupons": "cupom",
    "dashboard.cupons-generated": "Cupons gerados",
    "dashboard.top-eyebrow": "Curadoria",
    "dashboard.top-title": "Clientes mais valiosos",
    "dashboard.balance-label": "saldo",
  },
  es: {
    // Brand
    "brand.tagline": "MGSIS Tecnología",

    // Sidebar
    "sidebar.section": "Operación",
    "sidebar.collapse": "Colapsar",
    "sidebar.logout": "Salir",

    // Nav
    "nav.dashboard": "Dashboard",
    "nav.clientes": "Clientes",
    "nav.compras": "Compras",
    "nav.resgates": "Canjes",
    "nav.configuracoes": "Configuración",

    // Topbar
    "topbar.search": "Buscar clientes, compras, canjes...",
    "topbar.new-program": "Nuevo programa",
    "topbar.open-menu": "Abrir menú",
    "topbar.notifications": "Notificaciones",

    // Login hero (left panel)
    "login.eyebrow": "Programa multi-socios",
    "login.hero-heading": "Convierte cada compra en un motivo para volver.",
    "login.hero-desc":
      "Siempre Vos conecta el ERP de tu negocio a una plataforma elegante de cashback y puntos — con retención mensurable y operación sin fricción.",
    "login.stat1-label": "Retención",
    "login.stat2-label": "Config. del ERP",
    "login.stat3-label": "Transacciones",
    "login.hero-tag": "MGSIS TECNOLOGÍA · PY · 2026",

    // Login form (right panel)
    "login.form-eyebrow": "Acceder al panel",
    "login.form-heading": "Ingresa a tu cuenta",
    "login.form-desc":
      "Continúa con el correo registrado. Los campos vienen pre-completados para demostración.",
    "login.email-label": "Correo corporativo",
    "login.email-placeholder": "tu@empresa.com",
    "login.password-label": "Contraseña",
    "login.forgot-password": "Olvidé mi contraseña",
    "login.remember": "Mantener sesión iniciada por 7 días",
    "login.submit": "Ingresar al panel",
    "login.terms-prefix": "Al continuar, aceptas los",
    "login.terms-link": "Términos de Uso",
    "login.terms-and": "y la",
    "login.privacy-link": "Política de Privacidad",
    "login.terms-suffix": "de Siempre Vos.",
    "login.toast-title": "Bienvenida de vuelta",
    "login.toast-desc": "Estás conectada a Siempre Vos.",
    "login.forgot-toast": "Enviamos un enlace de recuperación",
    "login.forgot-toast-desc": "Revisa tu bandeja de entrada (mock).",

    // Dashboard
    "dashboard.eyebrow": "Bienvenida",
    "dashboard.title": "Resumen de tu programa",
    "dashboard.desc":
      "Sigue las ventas, recompensas y el engagement de tus clientes en un solo lugar — con la precisión de un informe financiero.",
    "dashboard.view-purchases": "Ver compras",
    "dashboard.adjust-program": "Ajustar programa",
    "dashboard.active-customers": "Clientes activos",
    "dashboard.total-sold": "Total vendido",
    "dashboard.cashback-generated": "Cashback generado",
    "dashboard.points-generated": "Puntos generados",
    "dashboard.redemptions": "Canjes realizados",
    "dashboard.purchases-today": "Compras hoy",
    "dashboard.balance": "Saldo distribuido",
    "dashboard.last-30-days": "últimos 30 días",
    "dashboard.current-month": "mes corriente",
    "dashboard.processed-erp": "procesadas por el ERP",
    "dashboard.available-redeem": "disponible para canje",
    "dashboard.chart-eyebrow": "Movimiento · 30 días",
    "dashboard.chart-title": "Compras y recompensas",
    "dashboard.chart-desc":
      "Volumen diario de ventas procesadas por el ERP y el respectivo cashback generado para los clientes.",
    "dashboard.legend-sales": "Ventas",
    "dashboard.legend-rewards": "Recompensas",
    "dashboard.customers-eyebrow": "Clientes · 6 meses",
    "dashboard.customers-title": "Base activa",
    "dashboard.customers-desc":
      "Crecimiento de la base activa y adquisición mensual.",
    "dashboard.recent-eyebrow": "Actividad reciente",
    "dashboard.recent-title": "Últimas compras recibidas",
    "dashboard.view-all": "Ver todas",
    "dashboard.cashback": "cashback",
    "dashboard.points": "puntos",
    "dashboard.cupons": "cupón",
    "dashboard.cupons-generated": "Cupones generados",
    "dashboard.top-eyebrow": "Curación",
    "dashboard.top-title": "Clientes más valiosos",
    "dashboard.balance-label": "saldo",
  },
} as const;

export type TranslationKey = keyof typeof translations.pt;

export function getT(lang: Language) {
  return (key: TranslationKey): string => translations[lang][key] ?? key;
}
