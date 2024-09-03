---
order: 1
---
# Conditions

The conditions attribute can be used to modify how certain fields display in relation to other fields values.. for example, if a dropdown has one value show one set of fields and if another show another set of fields.  This can be a single formula, or multiple formulas separated by a pipe character ("|").

## Formula

__CONDITION__ + "?" + __THEN__ + ":" + __ELSE__

12023=1002?12024=show:12024=hide

__CONDITION:__ The test to perform.  If it returns true, then __THEN__ will be performed, otherwise _(optional)_ __ELSE__ will be performed. In the example, if field __id__ 12023 equals __value__ 1002, then return true.  In the case of select or checkbox fields, you can specify multiple values by comma separating them.  The condition will return true if any of the values are selected (example: 12023=1002,1003,1005). The equals sign is the only operator allowed.

__THEN & ELSE:__ The action to take if true, or the the action to take if false.  This formula consists of what to take action on (field id or field ids) followed by the equals sign then action to take or actions to take  (__IDS__=__ACTIONS__).  __IDS__ is a comma separated list of field IDs to take action on.  __ACTIONS__ is a comma separated list of actions to take.  Predefined actions are __show__, __hide__, __required__, __optional__, and __clear__.  If a predefined action is not used, it will instead set the value.
> __ACTIONS__:<br>
> __show__: Show the field (12024=show)<br>
> __hide__: Hide the field (12024=hide)<br>
> __required__: Make the field required (12024=required)<br>
> __optional__: Make the field optional (12024=optional)<br>
> __clear__:  Clear the fields value (12024=clear)<br>
> __(anything else)__: Set the field value (12024=Hello)

__ELSE__: Optional.  If no operator is used, the formula will assume the actions should be taken on the same __IDS__ in the __THEN__ part of the formula.

## Advanced Example

```
conditions="10279=17940?3,10289=show,required:3,10289=hide,optional|10279=17938,17939,17941?10290,10291,10288,10292,10293=show:10290,10291,10288,10292,10293=hide"
```

If field 10279 equals 17940, then make fields 3 and 10289 visible and required, otherwise make fields 3 and 10289 hidden and optional.  Also, if field 10279 equals 17938, 17939, or 17941, then make fields 10290, 10291, 10288, 10292, and 10293 visible, otherwise make fields 10290, 10291, 10288, 10292, 10293 hidden.