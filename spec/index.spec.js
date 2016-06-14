describe("HeaderCookieManager", function() {
  var HeaderCookieManager = require('../index.js');
  var sut;
  var next;

  var _noop = function(){};
  var Response = function () {
    return {
      cookie: function(key, value) { this.cookies[key] = value; },
      clearCookies: function(key) { this.clearedCookies.push(key); },
      cookies: [],
      clearedCookies: []
    };
  };

  beforeEach(function() {
    sut = new HeaderCookieManager();
    next = jasmine.createSpy('next');
  });

  it("should be create without defaults", function() {
    expect(sut).toBeDefined();
  });
  it('should handle null params', function() {
    expect(sut).not.toThrow();
  });
  it('should call next', function() {
    sut({}, new Response(), next);
    expect(next).toHaveBeenCalled();
  });

  describe('when setting cookies with \'x-chm-set-cookie\': ', function() {
    function test(headers, expectedKey, expectedValue) {
      var response = new Response();
      sut({headers: headers}, response, _noop);
      expect(response.cookies[expectedKey]).toBe(expectedValue);
    }
    it('should split key from value', function() {
      test({'x-chm-set-cookie': 'key=val'}, 'key', 'val');
    });
    it('should set empty string value', function() {
      test({'x-chm-set-cookie': 'key'}, 'key', '');
    });
    it('should allow `=` in cookie', function() {
      test({'x-chm-set-cookie': 'key=1=2'}, 'key', '1=2');
    });
  });

  describe('when clearing cookies with \'x-chm-clear-cookie\': ', function() {
    function test(headers, expectedValue) {
      var response = new Response();
      sut({headers: headers}, response, _noop);
      expect(response.clearedCookies).toEqual(expectedValue);
    }
    it('should clear single values', function() {
      test({'x-chm-clear-cookie': 'key'}, ['key']);
    })
    it('should clear multiple values', function() {
      test({'x-chm-clear-cookie': 'key1, key2'}, ['key1', 'key2']);
    })

  });


});
