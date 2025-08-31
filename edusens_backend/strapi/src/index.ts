// import type { Core } from '@strapi/strapi';

export default {
  register() {},
  async bootstrap({ strapi }: any) {
    // Auto-enable public permissions for Course collection (find, findOne)
    try {
      const role = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
      if (!role) return;
      const needed = ['api::course.course.find', 'api::course.course.findOne'];
      let updated = false;
      for (const perm of needed) {
        const existing = role.permissions.find((p: any) => p.action === perm);
        if (existing && !existing.enabled) {
          existing.enabled = true;
          updated = true;
        }
      }
      if (updated) {
        await strapi.query('plugin::users-permissions.role').update({
          where: { id: role.id },
          data: { permissions: role.permissions },
        });
        strapi.log.info('Public role permissions updated for Course collection');
      }
    } catch (err: any) {
      strapi.log.warn('Could not set public permissions automatically: ' + err.message);
    }
  },
};
