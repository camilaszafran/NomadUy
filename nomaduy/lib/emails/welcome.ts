export function welcomeEmail(nombre: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenido/a a NomadUY</title>
</head>
<body style="margin:0;padding:0;background:#F0F5FB;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F5FB;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1A4B8C 0%,#0f3a62 100%);padding:40px 48px;text-align:center;">
              <p style="margin:0;font-size:28px;letter-spacing:2px;">🇺🇾</p>
              <h1 style="margin:16px 0 0;color:#ffffff;font-size:26px;font-weight:700;line-height:1.2;">
                Bienvenido/a a NomadUY, ${nombre}
              </h1>
            </td>
          </tr>

          <!-- Body — EDIT THIS SECTION -->
          <tr>
            <td style="padding:40px 48px;">
              <p style="margin:0 0 20px;color:#0D1F3C;font-size:16px;line-height:1.7;">
                Estamos muy contentos de que formes parte de la comunidad. Estamos seguros de que Uruguay es un destino increíble y que vas a quedar encantado. A continuación te pasamos un poco de info para que quedemos conectados y puedas sacarle todo el jugo a la comunidad.
              </p>

              <!-- PDF download link -->
              <table cellpadding="0" cellspacing="0" style="margin:32px 0;">
                <tr>
                  <td style="background:#1A4B8C;border-radius:8px;padding:14px 28px;text-align:center;">
                    <a href="https://nomaduy.com/guides/guia-es.pdf"
                       style="color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;">
                      Descargá tu guía →
                    </a>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" style="margin:0;">
                <tr>
                  <td style="background:#25D366;border-radius:8px;padding:14px 28px;text-align:center;">
                    <a href="https://chat.whatsapp.com/GMFGWc9L10v0sBRYn9SwAE?mode=gi_t"
                       style="color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;">
                      Unirme al grupo de WhatsApp →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F0F5FB;padding:24px 48px;border-top:1px solid #E8F1FB;">
              <p style="margin:0;color:#4A6280;font-size:12px;text-align:center;line-height:1.6;">
                NomadUY · Montevideo, Uruguay<br />
                <a href="https://nomad.com.uy" style="color:#1A4B8C;text-decoration:none;">nomad.com.uy</a>
              </p>
              <p style="margin:16px 0 0;color:#8BA4BE;font-size:11px;text-align:center;">
                No querés recibir más emails de NomadUY?
                <a href="mailto:bienvenida@nomad.com.uy?subject=Darme%20de%20baja" style="color:#8BA4BE;">Darse de baja</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}
