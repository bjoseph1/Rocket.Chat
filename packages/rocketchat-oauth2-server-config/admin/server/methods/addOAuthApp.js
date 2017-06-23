Meteor.methods({
	addOAuthApp(application) {
		if (!RocketChat.authz.hasPermission(this.userId, 'manage-oauth-apps')) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'addOAuthApp' });
		}
		if (!_.isString(application.name) || application.name.trim() === '') {
			throw new Meteor.Error('error-invalid-name', 'Invalid name', { method: 'addOAuthApp' });
		}
		if (!_.isString(application.redirectUri) || application.redirectUri.trim() === '') {
			throw new Meteor.Error('error-invalid-redirectUri', 'Invalid redirectUri', { method: 'addOAuthApp' });
		}
		if (!_.isBoolean(application.active)) {
			throw new Meteor.Error('error-invalid-arguments', 'Invalid arguments', { method: 'addOAuthApp' });
		}
		application.clientId = Random.id();
		application.clientSecret = Random.secret();
		application._createdAt = new Date;
		application._createdBy = RocketChat.models.Users.findOne(this.userId, { fields: { username: 1 } });
		application._id = RocketChat.models.OAuthApps.insert(application);
		return application;
	}
});
