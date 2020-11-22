const yellow = Color.valueOf("ffff00");
const orange = Color.valueOf("e7e700");

const thunderTrail = newEffect(13, e => {
	Draw.color(yellow, orange, e.fin());
	Fill.circle(e.x, e.y, 1.5 * e.fout());
});

const elecMissileTrail = newEffect(50, e => {
	Draw.color(yellow);
	Fill.circle(e.x, e.y, e.rotation * e.fout());
});

const biggerThunderTrail = newEffect(13, e => {
	Draw.color(yellow, orange, e.fin());
	Fill.circle(e.x, e.y, 3 * e.fout());
});

const thunderBomb = extend(BasicBulletType, {
	load(){
      this.backRegion = Core.atlas.find("vanilla-upgraded-bullet-explo-back");
      this.frontRegion = Core.atlas.find("vanilla-upgraded-bullet-explo");
    },

	draw(b){
        Draw.color(yellow);
        Draw.rect(this.backRegion, b.x, b.y, 6, 6, b.rot() - 90);
        Draw.color(orange);
        Draw.rect(this.frontRegion, b.x, b.y, 6, 6, b.rot() - 90);
        Draw.color();
	},
	
	despawned(b){
		this.super$despawned(b);

		for (var i = 0; i < Mathf.random(2, 5); i++) {
			Lightning.create(b.getTeam(), yellow, 26, b.x, b.y, Mathf.random(360), Mathf.random(4, 18));
		};
		for (var i = 0; i < Mathf.random(1, 3); i++) {
			Lightning.create(b.getTeam(), orange, 28, b.x, b.y, Mathf.random(360), Mathf.random(4, 18));
		};
	}
});
thunderBomb.drag = 0.033;
thunderBomb.explodeRange = 4;
thunderBomb.speed = 3;
thunderBomb.damage = 15;
thunderBomb.splashDamage = 5;
thunderBomb.splashDamageRadius = 10;
thunderBomb.bulletShrink = 0;
thunderBomb.hitSize = 4;
thunderBomb.knockback = 2;
thunderBomb.hitShake = Fx.none;
thunderBomb.hitEffect = Fx.flakExplosionBig;
thunderBomb.hitSound = Sounds.explosionbig;
thunderBomb.despawnEffect = Fx.flakExplosionBig;
thunderBomb.collidesTiles = true;
thunderBomb.collidesAir = true;
thunderBomb.lifetime = 70;

const thunderMissiles = extend(MissileBulletType, {
	despawned(b){
		this.super$despawned(b);

		for (var i = 0; i < Mathf.random(2, 5); i++) {
			Lightning.create(b.getTeam(), yellow, 26, b.x, b.y, Mathf.random(360), Mathf.random(4, 18));
		};
		for (var i = 0; i < Mathf.random(1, 3); i++) {
			Lightning.create(b.getTeam(), orange, 28, b.x, b.y, Mathf.random(360), Mathf.random(4, 18));
		};
	},

	update(b){
		this.super$update(b);

		if(Mathf.chance(Time.delta() * 0.2)){
            Effects.effect(elecMissileTrail, b.x, b.y, 2);
        }
	} 
});
thunderMissiles.bulletWidth = 10;
thunderMissiles.bulletHeight = 10;
thunderMissiles.speed = 5.5;
thunderMissiles.damage = 25;
thunderMissiles.bulletShrink = 0;
thunderMissiles.drag = -0.003;
thunderMissiles.keepVelocity = false;
thunderMissiles.splashDamageRadius = 32;
thunderMissiles.splashDamage = 10;
thunderMissiles.lifetime = 110;
thunderMissiles.trailColor = Color.white;
thunderMissiles.hitEffect = Fx.blastExplosion;
thunderMissiles.despawnEffect = Fx.blastExplosion;
thunderMissiles.backColor = yellow;
thunderMissiles.frontColor = orange;
thunderMissiles.weaveScale = 8;
thunderMissiles.weaveMag = 5;
thunderMissiles.bulletSprite = "missile";

const thunderBall = extend(BasicBulletType, {
	update(b){
		const vec = new Vec2();
		
		if(Mathf.chance(0.15)){
			Sounds.spark.at(b);
			vec.trns(b.rot() + Mathf.range(2.0), 12);
			Lightning.create(b.getTeam(), yellow, 26, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), Mathf.random(4, 18));
		};

		if(Mathf.chance(0.15)){
			vec.trns(b.rot() + Mathf.range(2.0), 12);
			Lightning.create(b.getTeam(), orange, 28, b.x + vec.x + Mathf.range(24.0), b.y + vec.y + Mathf.range(24.0), b.rot() + Mathf.range(46.0), Mathf.random(4, 18));
		}
	},

	draw(b){
		Draw.color(yellow, orange, b.fin());
		Fill.poly(b.x, b.y, 6, 6 + b.fout() * 6.1, b.rot());
		Draw.reset();
	},

	despawned(b){
		Sounds.explosionbig.at(b);
		for(var i = 0; i < 4; i++){
			Lightning.create(b.getTeam(), yellow, 12, b.x, b.y, b.rot() + Mathf.random(0, 360), 24);
		}
		for(var i = 0; i < 2; i++){
			Lightning.create(b.getTeam(), orange, 12, b.x, b.y, b.rot() + Mathf.random(0, 360), 24);
		}
	}
});
thunderBall.speed = 4.6;
thunderBall.damage = 32;
thunderBall.lifetime = 140;
thunderBall.hitSize = 22;
thunderBall.despawnEffect = Fx.none;
thunderBall.shootEffect = Fx.none;
thunderBall.collides = true;
thunderBall.collidesTiles = true;
thunderBall.collidesAir = true;
thunderBall.pierce = true;
thunderBall.keepVelocity = false;

const finalThunder = extend(BasicBulletType, {
  range(){
    return 320;
  },
  
  despawned(b){
	  	Sounds.spark.at(b);
		for(var i = 0; i < 4; i++){
			Lightning.create(b.getTeam(), yellow, 22, b.x, b.y, b.rot() + Mathf.range(46.0), 24);
		};
		for(var i = 0; i < 3; i++){
			Lightning.create(b.getTeam(), orange, 22, b.x, b.y, b.rot() + Mathf.range(46.0), 24);
		};
		for (var i = 0; i < 8; i++) {
			Bullet.create(this.frags[1], b, b.x, b.y, b.rot() + Mathf.range(10.0), Mathf.random(0.75, 1.25));
		};

		Bullet.create(this.frags[0], b, b.x, b.y, b.rot(), Mathf.random(0.75, 1.25));
	},
	
	draw(b){}
});
finalThunder.speed = 0.001;
finalThunder.damage = 300;
finalThunder.frags = [thunderBall, thunderMissiles];
finalThunder.lifetime = 1;
finalThunder.hitSize = 12;
finalThunder.collidesTiles = false;
finalThunder.collidesAir = false;
finalThunder.collides = false;
finalThunder.instantDisappear = true;
finalThunder.keepVelocity = false;
finalThunder.despawnEffect = Fx.none;
finalThunder.shootEffect = Fx.none;
finalThunder.smokeEffect = Fx.none;

const thunderEquipe = extendContent(Weapon, "thunder-equipe", {});
thunderEquipe.reload = 120;
thunderEquipe.alternate = true;
thunderEquipe.width = 0;
thunderEquipe.length = 0;
thunderEquipe.bullet = finalThunder;
thunderEquipe.shootSound = Sounds.none;

const thunder = extendContent(Mech, "thunder", {
	load(){
		this.super$load();
	  
		this.region = Core.atlas.find(this.name);
		this.cellRegion = Core.atlas.find(this.name + "-cell");
	},

	updateAlt(player){
		const minVb = 4.6;
		const vectA = new Vec2();
		const maxVb = 9.2;
		const sclb = Mathf.clamp((player.velocity().len() - minVb) / (maxVb - minVb));
		const pred = new Vec2();
		
		if(Mathf.chance(sclb)){
			pred.trns(player.velocity().angle(), 16);
			if(Mathf.chance(0.25)){
				Lightning.create(player.getTeam(), yellow, 18 * Vars.state.rules.playerDamageMultiplier, player.x, player.y, player.rotation + Mathf.range(21.0), Mathf.floorPositive((player.velocity().len() * 2) + Mathf.random(6, 16)));
				for (var i = 0; i < 2; i++) {
					Bullet.create(thunderBomb, player, player.getTeam(), player.x, player.y, player.rotation + Mathf.range(10.0), Mathf.random(0.75, 1.25));
				}
			}
		};

		for(var i = 0; i < 2; i++){
			const shift = Mathf.clamp(player.velocity().len(), 0, 2);
			const size = (this.engineSize * 1.5);
			var sn = Mathf.signs[i];
			vectA.trns(player.rotation - 90, 7 * sn, -7.95 + (shift * 2));
			Effects.effect(thunderTrail, player.x + vectA.x + Mathf.range(1.0), player.y + vectA.y + Mathf.range(1.0), (size + Mathf.absin(Time.time(), 2, size / 4)) / 2);
		};
		vectA.trns(player.rotation + 90, 0, this.engineOffset - (shift * 2));
		Effects.effect(biggerThunderTrail, player.x + vectA.x + Mathf.range(1.0), player.y + vectA.y + Mathf.range(1.0), (size + Mathf.absin(Time.time(), 2, size / 4)) / 2);
	},
	
	draw(player){
		const health = player.healthf();

		Draw.color(Color.black, player.getTeam().color, health + Mathf.absin(Time.time(), health * 5, 1 - health));
		Draw.rect(Core.atlas.find(this.name + "-cell"), player.x, player.y, player.rotation - 90);
		Draw.color();
	}
});
thunder.flying = true;
thunder.health = 520;
thunder.drag = 0.06;
thunder.engineSize = 2.25;
thunder.drawCell = false;
thunder.speed = 0.4;
thunder.boostSpeed = 0.6;
thunder.mass = 5;
thunder.drillPower = 3.1;
thunder.shake = 4.5;
thunder.weapon = thunderEquipe;
thunder.engineColor = yellow;
thunder.mineSpeed = 1.8;
thunder.buildPower = 1.7;
thunder.itemCapacity = 40;
thunder.engineOffset = 9;

const thunderPad = extendContent(MechPad, "thunder-ship-pad", {
	init(){
   	this.consumes.power(4.5);
    this.super$init();
  },
});
thunderPad.size = 5;
thunderPad.mech = thunder;
thunderPad.buildTime = 300;
