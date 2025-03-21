const express = require('express');

const authRoutes = require('./auth');
const usersRoutes = require('./users');
const atividadesRoutes = require('./atividades');
const cadastrosRoutes = require('./cadastros');
const clinicaInstituicoesRoutes = require('./clinicasInstituicoes');
const contactosRoutes = require('./contactos');
const depoimentosRoutes = require('./depoimentos');
const equipeRoutes = require('./equipe');
const especialistasRoutes = require('./especialista');
const historiasRoutes = require('./historias');
const instituicoesRoutes = require('./instituicoes');
const missaoValoresRoutes = require('./missaoVisaoValores');
const parceirosRoutes = require('./parceiros');
const publicidadesRoutes = require('./publicidades');
const servicosRoutes = require('./servicos');
const videosRoutes = require('./videos');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/atividades', atividadesRoutes);
router.use('/cadastros', cadastrosRoutes);
router.use('/clinicas-instituicoes', clinicaInstituicoesRoutes);
router.use('/contactos', contactosRoutes);
router.use('/depoimentos', depoimentosRoutes);
router.use('/equipe', equipeRoutes);
router.use('/especialistas', especialistasRoutes);
router.use('/historias', historiasRoutes);
router.use('/instituicoes', instituicoesRoutes);
router.use('/missao_valores', missaoValoresRoutes);
router.use('/parceiros', parceirosRoutes);
router.use('/publicidades', publicidadesRoutes);
router.use('/servicos', servicosRoutes);
router.use('/videos', videosRoutes);

module.exports = router;
