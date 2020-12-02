const vibroEffect = new Effect(50, e => {
    Draw.color(Color.white, Color.blue, e.fin());
    Lines.stroke(e.fout() * 10);
    Lines.circle(e.x, e.y, e.fin() * 40);
});

const titaniumAmmo = extend(BasicBulletType, {});
titaniumAmmo.speed = 28;
titaniumAmmo.height = 25;
titaniumAmmo.width = 12;
titaniumAmmo.lifetime = 100;
titaniumAmmo.damage = 150;
titaniumAmmo.knockback = 1;
titaniumAmmo.hitSize = 12;
titaniumAmmo.frontColor = Color.valueOf("a5b9fa");
titaniumAmmo.backColor = Color.valueOf("7373c7");
titaniumAmmo.shootEffect = Fx.explosion;
titaniumAmmo.hitEffect = Fx.bigShockwave;

const thoriumAmmo = extend(BasicBulletType, {});
thoriumAmmo.speed = 31;
thoriumAmmo.height = 28;
thoriumAmmo.width = 15;
thoriumAmmo.lifetime = 110;
thoriumAmmo.damage = 225;
thoriumAmmo.knockback = 1.4;
thoriumAmmo.hitSize = 12;
thoriumAmmo.frontColor = Color.valueOf("faa2c7");
thoriumAmmo.backColor = Color.valueOf("cc8fc0");
thoriumAmmo.shootEffect = Fx.explosion;
thoriumAmmo.hitEffect = Fx.bigShockwave;

const emeraldAmmo = extend(BasicBulletType, {});
emeraldAmmo.speed = 35;
emeraldAmmo.height = 30;
emeraldAmmo.width = 11;
emeraldAmmo.lifetime = 150;
emeraldAmmo.damage = 175;
emeraldAmmo.knockback = 1.1;
emeraldAmmo.pierce = true;
emeraldAmmo.hitSize = 12;
emeraldAmmo.frontColor = Color.valueOf("84f591");
emeraldAmmo.backColor = Color.valueOf("61ad7e");
emeraldAmmo.shootEffect = Fx.explosion;
emeraldAmmo.hitEffect = Fx.bigShockwave;

const obsidianAmmo = extend(BasicBulletType, {});
obsidianAmmo.speed = 22;
obsidianAmmo.height = 31;
obsidianAmmo.width = 18;
obsidianAmmo.lifetime = 90;
obsidianAmmo.damage = 275;
obsidianAmmo.hitSize = 12;
obsidianAmmo.knockback = 2;
obsidianAmmo.splashDamage = 2;
obsidianAmmo.splashDamageRadius = 3;
obsidianAmmo.frontColor = Color.valueOf("14002b");
obsidianAmmo.backColor = Color.valueOf("0d001c");
obsidianAmmo.shootEffect = Fx.explosion;
obsidianAmmo.hitEffect = Fx.bigShockwave;

const vibroAmmo = extend(BasicBulletType, {});
vibroAmmo.speed = 30;
vibroAmmo.height = 28;
vibroAmmo.width = 18;
vibroAmmo.lifetime = 100;
vibroAmmo.damage = 175;
vibroAmmo.hitSize = 12;
vibroAmmo.knockback = 1.1;
vibroAmmo.splashDamage = 20;
vibroAmmo.splashDamageRadius = 70;
vibroAmmo.frontColor = Color.valueOf("d49fb5");
vibroAmmo.backColor = Color.valueOf("b08295");
vibroAmmo.shootEffect = Fx.explosion;
vibroAmmo.hitEffect = vibroEffect;

const sniper = extendContent(ItemTurret, "sniper", {
  init(){
    this.super$init();
    this.ammo(
      Items.titanium, titaniumAmmo,
      Items.thorium, thoriumAmmo,
      Vars.content.getByName(ContentType.item, "vanilla-upgraded-obsidienne"), obsidianAmmo,
      Vars.content.getByName(ContentType.item, "vanilla-upgraded-emeraude"), emeraldAmmo,
      Vars.content.getByName(ContentType.item, "vanilla-upgraded-vibro"), vibroAmmo
    );
  }
});