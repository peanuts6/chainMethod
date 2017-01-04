# chainMethod
chain method of javascript

## usage
```javascript
LazyMan("Hank");
```
```
Hi! This is Hank
```


```javascript
LazyMan("Hank").eat("dinner");
```
```
Hi! This is Hank
Eat dinner~
```

```javascript
LazyMan("Hank").sleep(5).eat("dinner");
```
```
Hi! This is Hank
Wake up after 5 minuts
Eat dinner~
```

```javascript
LazyMan("Hank").eat("dinner").sleepFirst(5);
```
```
Wake up after 5 minuts
Hi! This is Hank
Eat dinner~
```



