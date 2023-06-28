export const signupTemplate = (
  canonicalRootUrl: string,
  marketplaceName: string,
  name: string,
  verifyEmailLink: string
) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>

    <style>
      p,
      a.link {
        color: #ffffff;
        font-size: 14px;
      }
      body {
        padding: 16px;
      }
    </style>
</head>

<body>
    <div class="es-wrapper-color">
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <table class="es-content esd-footer-popover" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#0c0c0c" align="center" style="background-color: #0c0c0c; padding: 16px">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-image es-p20t" style="font-size: 0px;"><a target="_blank"><img class="adapt-img" src="https://vudlvw.stripocdn.email/content/guids/CABINET_5207dd77c441aab8db96afb8cb63b6651cdca88605300e8abdf8694e37224ae4/images/group_2790.png" alt="${marketplaceName} logo" style="display: block;" width="400"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="es-p20t es-p20r es-p20l esd-structure" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text es-p30t es-p40b es-p20r es-p20l">
                                                                                        <p>Hi ${name},</p>
                                                                                        <p>To complete your signup to <a class="link" href="${canonicalRootUrl}" target="_blank">${marketplaceName}</a>, verify your email by clicking the link below:</p>
                                                                                        <p><br><a class="link" href="${verifyEmailLink}" target="_blank">${verifyEmailLink}</a><br><br></p>
                                                                                        <p>Alternatively, you can copy the link to your browser's address bar.<br>If you don't use this link within 24 hours, it will expire. You can request a new verification link, if you need to.</p>
                                                                                        <p>Best regards,<br>The ${marketplaceName} team</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>
`;
