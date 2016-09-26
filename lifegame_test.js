describe('lifeGame',function(){
	it('should be a function',function(){
		assert.isFunction(lifeGame);
	});
	it('should have one arguments',function(){
		assert.equal(lifeGame.length,1);
	})
	it('should return false if size bigger than 100',function(){
		assert.strictEqual(lifeGame(101),false);
	})
});

describe('LifeGame.prototype.countAround',function(){
	it('should be a function',function(){
		assert.isFunction(lifeGame.prototype.countAround);
	});
	it('should have two arguments',function(){
		assert.equal(lifeGame.prototype.countAround.length,2);
	})
});