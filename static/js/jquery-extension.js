 // jQuery Cookie Plugin
// https://github.com/carhartl/jquery-cookie
(function($, document, undefined) {
    var pluses = /\+/g;
    function raw(s) {
        return s
    }
    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '))
    }
    var config = $.cookie = function(key, value, options) {
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);
            if (value === null) {
                options.expires = -1
            }
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days)
            }
            value = config.json ? JSON.stringify(value) : String(value);
            return (document.cookie = [encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''))
        }
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return config.json ? JSON.parse(cookie) : cookie
            }
        }
        return null
    };
    config.defaults = {};
    $.removeCookie = function(key, options) {
        if ($.cookie(key) !== null) {
            $.cookie(key, null, options);
            return true
        }
        return false
    }
})(jQuery, document);


// jQuery Chosen Plugin
// https://github.com/harvesthq/chosen
(function() {
    var SelectParser;
    SelectParser = function() {
        function SelectParser() {
            this.options_index = 0, this.parsed = []
        }
        return SelectParser.prototype.add_node = function(child) {
            return child.nodeName.toUpperCase() === "OPTGROUP" ? this.add_group(child) : this.add_option(child)
        }, SelectParser.prototype.add_group = function(group) {
            var group_position, option, _i, _len, _ref, _results;
            group_position = this.parsed.length, this.parsed.push({array_index: group_position,group: !0,label: group.label,children: 0,disabled: group.disabled}), _ref = group.childNodes, _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++)
                option = _ref[_i], _results.push(this.add_option(option, group_position, group.disabled));
            return _results
        }, SelectParser.prototype.add_option = function(option, group_position, group_disabled) {
            if (option.nodeName.toUpperCase() === "OPTION")
                return option.text !== "" ? (group_position != null && (this.parsed[group_position].children += 1), this.parsed.push({array_index: this.parsed.length,options_index: this.options_index,value: option.value,text: option.text,html: option.innerHTML,selected: option.selected,disabled: group_disabled === !0 ? group_disabled : option.disabled,group_array_index: group_position,classes: option.className,style: option.style.cssText})) : this.parsed.push({array_index: this.parsed.length,options_index: this.options_index,empty: !0}), this.options_index += 1
        }, SelectParser
    }(), SelectParser.select_to_array = function(select) {
        var child, parser, _i, _len, _ref;
        parser = new SelectParser, _ref = select.childNodes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++)
            child = _ref[_i], parser.add_node(child);
        return parser.parsed
    }, this.SelectParser = SelectParser
}).call(this), function() {
    var AbstractChosen, root;
    root = this, AbstractChosen = function() {
        function AbstractChosen(form_field, options) {
            this.form_field = form_field, this.options = options != null ? options : {}, this.set_default_values(), this.is_multiple = this.form_field.multiple, this.set_default_text(), this.setup(), this.set_up_html(), this.register_observers(), this.finish_setup()
        }
        return AbstractChosen.prototype.set_default_values = function() {
            var _this = this;
            return this.click_test_action = function(evt) {
                return _this.test_active_click(evt)
            }, this.activate_action = function(evt) {
                return _this.activate_field(evt)
            }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.result_single_selected = null, this.allow_single_deselect = this.options.allow_single_deselect != null && this.form_field.options[0] != null && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : !1, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.search_contains = this.options.search_contains || !1, this.choices = 0, this.single_backstroke_delete = this.options.single_backstroke_delete || !1, this.max_selected_options = this.options.max_selected_options || Infinity
        }, AbstractChosen.prototype.set_default_text = function() {
            return this.form_field.getAttribute("data-placeholder") ? this.default_text = this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || "Select Some Options" : this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || "Select an Option", this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || "No results match"
        }, AbstractChosen.prototype.mouse_enter = function() {
            return this.mouse_on_container = !0
        }, AbstractChosen.prototype.mouse_leave = function() {
            return this.mouse_on_container = !1
        }, AbstractChosen.prototype.input_focus = function(evt) {
            var _this = this;
            if (!this.active_field)
                return setTimeout(function() {
                    return _this.container_mousedown()
                }, 50)
        }, AbstractChosen.prototype.input_blur = function(evt) {
            var _this = this;
            if (!this.mouse_on_container)
                return this.active_field = !1, setTimeout(function() {
                    return _this.blur_test()
                }, 100)
        }, AbstractChosen.prototype.result_add_option = function(option) {
            var classes, style;
            return option.disabled ? "" : (option.dom_id = this.container_id + "_o_" + option.array_index, classes = option.selected && this.is_multiple ? [] : ["active-result"], option.selected && classes.push("result-selected"), option.group_array_index != null && classes.push("group-option"), option.classes !== "" && classes.push(option.classes), style = option.style.cssText !== "" ? ' style="' + option.style + '"' : "", '<li id="' + option.dom_id + '" class="' + classes.join(" ") + '"' + style + ">" + option.html + "</li>")
        }, AbstractChosen.prototype.results_update_field = function() {
            return this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.result_single_selected = null, this.results_build()
        }, AbstractChosen.prototype.results_toggle = function() {
            return this.results_showing ? this.results_hide() : this.results_show()
        }, AbstractChosen.prototype.results_search = function(evt) {
            return this.results_showing ? this.winnow_results() : this.results_show()
        }, AbstractChosen.prototype.keyup_checker = function(evt) {
            var stroke, _ref;
            stroke = (_ref = evt.which) != null ? _ref : evt.keyCode, this.search_field_scale();
            switch (stroke) {
                case 8:
                    if (this.is_multiple && this.backstroke_length < 1 && this.choices > 0)
                        return this.keydown_backstroke();
                    if (!this.pending_backstroke)
                        return this.result_clear_highlight(), this.results_search();
                    break;
                case 13:
                    evt.preventDefault();
                    if (this.results_showing)
                        return this.result_select(evt);
                    break;
                case 27:
                    return this.results_showing && this.results_hide(), !0;
                case 9:
                case 38:
                case 40:
                case 16:
                case 91:
                case 17:
                    break;
                default:
                    return this.results_search()
            }
        }, AbstractChosen.prototype.generate_field_id = function() {
            var new_id;
            return new_id = this.generate_random_id(), this.form_field.id = new_id, new_id
        }, AbstractChosen.prototype.generate_random_char = function() {
            var chars, newchar, rand;
            return chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", rand = Math.floor(Math.random() * chars.length), newchar = chars.substring(rand, rand + 1)
        }, AbstractChosen
    }(), root.AbstractChosen = AbstractChosen
}.call(this), function() {
    var $, Chosen, get_side_border_padding, root, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        function ctor() {
            this.constructor = child
        }
        for (var key in parent)
            __hasProp.call(parent, key) && (child[key] = parent[key]);
        return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
    };
    root = this, $ = jQuery, $.fn.extend({chosen: function(options) {
            return $.browser.msie && ($.browser.version === "6.0" || $.browser.version === "7.0" && document.documentMode === 7) ? this : this.each(function(input_field) {
                var $this;
                $this = $(this);
                if (!$this.hasClass("chzn-done"))
                    return $this.data("chosen", new Chosen(this, options))
            })
        }}), Chosen = function(_super) {
        function Chosen() {
            Chosen.__super__.constructor.apply(this, arguments)
        }
        return __extends(Chosen, _super), Chosen.prototype.setup = function() {
            return this.form_field_jq = $(this.form_field), this.current_value = this.form_field_jq.val(), this.is_rtl = this.form_field_jq.hasClass("chzn-rtl")
        }, Chosen.prototype.finish_setup = function() {
            return this.form_field_jq.addClass("chzn-done")
        }, Chosen.prototype.set_up_html = function() {
            var container_div, dd_top, dd_width, sf_width;
            return this.container_id = this.form_field.id.length ? this.form_field.id.replace(/[^\w]/g, "_") : this.generate_field_id(), this.container_id += "_chzn", this.f_width = this.form_field_jq.outerWidth(), container_div = $("<div />", {id: this.container_id,"class": "chzn-container" + (this.is_rtl ? " chzn-rtl" : ""),style: "width: " + this.f_width + "px;"}), this.is_multiple ? container_div.html('<ul class="chzn-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chzn-drop" style="left:-9000px;"><ul class="chzn-results"></ul></div>') : container_div.html('<a href="javascript:void(0)" class="chzn-single chzn-default"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chzn-drop" style="left:-9000px;"><div class="chzn-search"><input type="text" autocomplete="off" /></div><ul class="chzn-results"></ul></div>'), this.form_field_jq.hide().after(container_div), this.container = $("#" + this.container_id), this.container.addClass("chzn-container-" + (this.is_multiple ? "multi" : "single")), this.dropdown = this.container.find("div.chzn-drop").first(), dd_top = this.container.height(), dd_width = this.f_width - get_side_border_padding(this.dropdown), this.dropdown.css({width: dd_width + "px",top: dd_top + "px"}), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chzn-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chzn-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chzn-search").first(), this.selected_item = this.container.find(".chzn-single").first(), sf_width = dd_width - get_side_border_padding(this.search_container) - get_side_border_padding(this.search_field), this.search_field.css({width: sf_width + "px"})), this.results_build(), this.set_tab_index(), this.form_field_jq.trigger("liszt:ready", {chosen: this})
        }, Chosen.prototype.register_observers = function() {
            var _this = this;
            return this.container.mousedown(function(evt) {
                return _this.container_mousedown(evt)
            }), this.container.mouseup(function(evt) {
                return _this.container_mouseup(evt)
            }), this.container.mouseenter(function(evt) {
                return _this.mouse_enter(evt)
            }), this.container.mouseleave(function(evt) {
                return _this.mouse_leave(evt)
            }), this.search_results.mouseup(function(evt) {
                return _this.search_results_mouseup(evt)
            }), this.search_results.mouseover(function(evt) {
                return _this.search_results_mouseover(evt)
            }), this.search_results.mouseout(function(evt) {
                return _this.search_results_mouseout(evt)
            }), this.form_field_jq.bind("liszt:updated", function(evt) {
                return _this.results_update_field(evt)
            }), this.form_field_jq.bind("liszt:activate", function(evt) {
                return _this.activate_field(evt)
            }), this.form_field_jq.bind("liszt:open", function(evt) {
                return _this.container_mousedown(evt)
            }), this.search_field.blur(function(evt) {
                return _this.input_blur(evt)
            }), this.search_field.keyup(function(evt) {
                return _this.keyup_checker(evt)
            }), this.search_field.keydown(function(evt) {
                return _this.keydown_checker(evt)
            }), this.is_multiple ? (this.search_choices.click(function(evt) {
                return _this.choices_click(evt)
            }), this.search_field.focus(function(evt) {
                return _this.input_focus(evt)
            })) : this.container.click(function(evt) {
                return evt.preventDefault()
            })
        }, Chosen.prototype.search_field_disabled = function() {
            this.is_disabled = this.form_field_jq[0].disabled;
            if (this.is_disabled)
                return this.container.addClass("chzn-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus", this.activate_action), this.close_field();
            this.container.removeClass("chzn-disabled"), this.search_field[0].disabled = !1;
            if (!this.is_multiple)
                return this.selected_item.bind("focus", this.activate_action)
        }, Chosen.prototype.container_mousedown = function(evt) {
            var target_closelink;
            if (!this.is_disabled)
                return target_closelink = evt != null ? $(evt.target).hasClass("search-choice-close") : !1, evt && evt.type === "mousedown" && !this.results_showing && evt.stopPropagation(), !this.pending_destroy_click && !target_closelink ? (this.active_field ? !this.is_multiple && evt && ($(evt.target)[0] === this.selected_item[0] || $(evt.target).parents("a.chzn-single").length) && (evt.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), $(document).click(this.click_test_action), this.results_show()), this.activate_field()) : this.pending_destroy_click = !1
        }, Chosen.prototype.container_mouseup = function(evt) {
            if (evt.target.nodeName === "ABBR" && !this.is_disabled)
                return this.results_reset(evt)
        }, Chosen.prototype.blur_test = function(evt) {
            if (!this.active_field && this.container.hasClass("chzn-container-active"))
                return this.close_field()
        }, Chosen.prototype.close_field = function() {
            return $(document).unbind("click", this.click_test_action), this.is_multiple || (this.selected_item.attr("tabindex", this.search_field.attr("tabindex")), this.search_field.attr("tabindex", -1)), this.active_field = !1, this.results_hide(), this.container.removeClass("chzn-container-active"), this.winnow_results_clear(), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale()
        }, Chosen.prototype.activate_field = function() {
            return !this.is_multiple && !this.active_field && (this.search_field.attr("tabindex", this.selected_item.attr("tabindex")), this.selected_item.attr("tabindex", -1)), this.container.addClass("chzn-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
        }, Chosen.prototype.test_active_click = function(evt) {
            return $(evt.target).parents("#" + this.container_id).length ? this.active_field = !0 : this.close_field()
        }, Chosen.prototype.results_build = function() {
            var content, data, _i, _len, _ref;
            this.parsing = !0, this.results_data = root.SelectParser.select_to_array(this.form_field), this.is_multiple && this.choices > 0 ? (this.search_choices.find("li.search-choice").remove(), this.choices = 0) : this.is_multiple || (this.selected_item.addClass("chzn-default").find("span").text(this.default_text), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? this.container.addClass("chzn-container-single-nosearch") : this.container.removeClass("chzn-container-single-nosearch")), content = "", _ref = this.results_data;
            for (_i = 0, _len = _ref.length; _i < _len; _i++)
                data = _ref[_i], data.group ? content += this.result_add_group(data) : data.empty || (content += this.result_add_option(data), data.selected && this.is_multiple ? this.choice_build(data) : data.selected && !this.is_multiple && (this.selected_item.removeClass("chzn-default").find("span").text(data.text), this.allow_single_deselect && this.single_deselect_control_build()));
            return this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.search_results.html(content), this.parsing = !1
        }, Chosen.prototype.result_add_group = function(group) {
            return group.disabled ? "" : (group.dom_id = this.container_id + "_g_" + group.array_index, '<li id="' + group.dom_id + '" class="group-result">' + $("<div />").text(group.label).html() + "</li>")
        }, Chosen.prototype.result_do_highlight = function(el) {
            var high_bottom, high_top, maxHeight, visible_bottom, visible_top;
            if (el.length) {
                this.result_clear_highlight(), this.result_highlight = el, this.result_highlight.addClass("highlighted"), maxHeight = parseInt(this.search_results.css("maxHeight"), 10), visible_top = this.search_results.scrollTop(), visible_bottom = maxHeight + visible_top, high_top = this.result_highlight.position().top + this.search_results.scrollTop(), high_bottom = high_top + this.result_highlight.outerHeight();
                if (high_bottom >= visible_bottom)
                    return this.search_results.scrollTop(high_bottom - maxHeight > 0 ? high_bottom - maxHeight : 0);
                if (high_top < visible_top)
                    return this.search_results.scrollTop(high_top)
            }
        }, Chosen.prototype.result_clear_highlight = function() {
            return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
        }, Chosen.prototype.results_show = function() {
            var dd_top;
            if (!this.is_multiple)
                this.selected_item.addClass("chzn-single-with-drop"), this.result_single_selected && this.result_do_highlight(this.result_single_selected);
            else if (this.max_selected_options <= this.choices)
                return this.form_field_jq.trigger("liszt:maxselected", {chosen: this}), !1;
            return dd_top = this.is_multiple ? this.container.height() : this.container.height() - 1, this.form_field_jq.trigger("liszt:showing_dropdown", {chosen: this}), this.dropdown.css({top: dd_top + "px",left: 0}), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results()
        }, Chosen.prototype.results_hide = function() {
            return this.is_multiple || this.selected_item.removeClass("chzn-single-with-drop"), this.result_clear_highlight(), this.form_field_jq.trigger("liszt:hiding_dropdown", {chosen: this}), this.dropdown.css({left: "-9000px"}), this.results_showing = !1
        }, Chosen.prototype.set_tab_index = function(el) {
            var ti;
            if (this.form_field_jq.attr("tabindex"))
                return ti = this.form_field_jq.attr("tabindex"), this.form_field_jq.attr("tabindex", -1), this.is_multiple ? this.search_field.attr("tabindex", ti) : (this.selected_item.attr("tabindex", ti), this.search_field.attr("tabindex", -1))
        }, Chosen.prototype.show_search_field_default = function() {
            return this.is_multiple && this.choices < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
        }, Chosen.prototype.search_results_mouseup = function(evt) {
            var target;
            target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
            if (target.length)
                return this.result_highlight = target, this.result_select(evt)
        }, Chosen.prototype.search_results_mouseover = function(evt) {
            var target;
            target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
            if (target)
                return this.result_do_highlight(target)
        }, Chosen.prototype.search_results_mouseout = function(evt) {
            if ($(evt.target).hasClass("active-result"))
                return this.result_clear_highlight()
        }, Chosen.prototype.choices_click = function(evt) {
            evt.preventDefault();
            if (this.active_field && !$(evt.target).hasClass("search-choice") && !this.results_showing)
                return this.results_show()
        }, Chosen.prototype.choice_build = function(item) {
            var choice_id, html, link, _this = this;
            return this.is_multiple && this.max_selected_options <= this.choices ? (this.form_field_jq.trigger("liszt:maxselected", {chosen: this}), !1) : (choice_id = this.container_id + "_c_" + item.array_index, this.choices += 1, item.disabled ? html = '<li class="search-choice search-choice-disabled" id="' + choice_id + '"><span>' + item.html + "</span></li>" : html = '<li class="search-choice" id="' + choice_id + '"><span>' + item.html + '</span><a href="javascript:void(0)" class="search-choice-close" rel="' + item.array_index + '"></a></li>', this.search_container.before(html), link = $("#" + choice_id).find("a").first(), link.click(function(evt) {
                return _this.choice_destroy_link_click(evt)
            }))
        }, Chosen.prototype.choice_destroy_link_click = function(evt) {
            return evt.preventDefault(), this.is_disabled ? evt.stopPropagation : (this.pending_destroy_click = !0, this.choice_destroy($(evt.target)))
        }, Chosen.prototype.choice_destroy = function(link) {
            if (this.result_deselect(link.attr("rel")))
                return this.choices -= 1, this.show_search_field_default(), this.is_multiple && this.choices > 0 && this.search_field.val().length < 1 && this.results_hide(), link.parents("li").first().remove()
        }, Chosen.prototype.results_reset = function() {
            this.form_field.options[0].selected = !0, this.selected_item.find("span").text(this.default_text), this.is_multiple || this.selected_item.addClass("chzn-default"), this.show_search_field_default(), this.results_reset_cleanup(), this.form_field_jq.trigger("change");
            if (this.active_field)
                return this.results_hide()
        }, Chosen.prototype.results_reset_cleanup = function() {
            return this.current_value = this.form_field_jq.val(), this.selected_item.find("abbr").remove()
        }, Chosen.prototype.result_select = function(evt) {
            var high, high_id, item, position;
            if (this.result_highlight)
                return high = this.result_highlight, high_id = high.attr("id"), this.result_clear_highlight(), this.is_multiple ? this.result_deactivate(high) : (this.search_results.find(".result-selected").removeClass("result-selected"), this.result_single_selected = high, this.selected_item.removeClass("chzn-default")), high.addClass("result-selected"), position = high_id.substr(high_id.lastIndexOf("_") + 1), item = this.results_data[position], item.selected = !0, this.form_field.options[item.options_index].selected = !0, this.is_multiple ? this.choice_build(item) : (this.selected_item.find("span").first().text(item.text), this.allow_single_deselect && this.single_deselect_control_build()), (!evt.metaKey || !this.is_multiple) && this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field_jq.val() !== this.current_value) && this.form_field_jq.trigger("change", {selected: this.form_field.options[item.options_index].value}), this.current_value = this.form_field_jq.val(), this.search_field_scale()
        }, Chosen.prototype.result_activate = function(el) {
            return el.addClass("active-result")
        }, Chosen.prototype.result_deactivate = function(el) {
            return el.removeClass("active-result")
        }, Chosen.prototype.result_deselect = function(pos) {
            var result, result_data;
            return result_data = this.results_data[pos], this.form_field.options[result_data.options_index].disabled ? !1 : (result_data.selected = !1, this.form_field.options[result_data.options_index].selected = !1, result = $("#" + this.container_id + "_o_" + pos), result.removeClass("result-selected").addClass("active-result").show(), this.result_clear_highlight(), this.winnow_results(), this.form_field_jq.trigger("change", {deselected: this.form_field.options[result_data.options_index].value}), this.search_field_scale(), !0)
        }, Chosen.prototype.single_deselect_control_build = function() {
            if (this.allow_single_deselect && this.selected_item.find("abbr").length < 1)
                return this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>')
        }, Chosen.prototype.winnow_results = function() {
            var found, option, part, parts, regex, regexAnchor, result, result_id, results, searchText, startpos, text, zregex, _i, _j, _len, _len2, _ref;
            this.no_results_clear(), results = 0, searchText = this.search_field.val() === this.default_text ? "" : $("<div/>").text($.trim(this.search_field.val())).html(), regexAnchor = this.search_contains ? "" : "^", regex = new RegExp(regexAnchor + searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i"), zregex = new RegExp(searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i"), _ref = this.results_data;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                option = _ref[_i];
                if (!option.disabled && !option.empty)
                    if (option.group)
                        $("#" + option.dom_id).css("display", "none");
                    else if (!this.is_multiple || !option.selected) {
                        found = !1, result_id = option.dom_id, result = $("#" + result_id);
                        if (regex.test(option.html))
                            found = !0, results += 1;
                        else if (option.html.indexOf(" ") >= 0 || option.html.indexOf("[") === 0) {
                            parts = option.html.replace(/\[|\]/g, "").split(" ");
                            if (parts.length)
                                for (_j = 0, _len2 = parts.length; _j < _len2; _j++)
                                    part = parts[_j], regex.test(part) && (found = !0, results += 1)
                        }
                        found ? (searchText.length ? (startpos = option.html.search(zregex), text = option.html.substr(0, startpos + searchText.length) + "</em>" + option.html.substr(startpos + searchText.length), text = text.substr(0, startpos) + "<em>" + text.substr(startpos)) : text = option.html, result.html(text), this.result_activate(result), option.group_array_index != null && $("#" + this.results_data[option.group_array_index].dom_id).css("display", "list-item")) : (this.result_highlight && result_id === this.result_highlight.attr("id") && this.result_clear_highlight(), this.result_deactivate(result))
                    }
            }
            return results < 1 && searchText.length ? this.no_results(searchText) : this.winnow_results_set_highlight()
        }, Chosen.prototype.winnow_results_clear = function() {
            var li, lis, _i, _len, _results;
            this.search_field.val(""), lis = this.search_results.find("li"), _results = [];
            for (_i = 0, _len = lis.length; _i < _len; _i++)
                li = lis[_i], li = $(li), li.hasClass("group-result") ? _results.push(li.css("display", "auto")) : !this.is_multiple || !li.hasClass("result-selected") ? _results.push(this.result_activate(li)) : _results.push(void 0);
            return _results
        }, Chosen.prototype.winnow_results_set_highlight = function() {
            var do_high, selected_results;
            if (!this.result_highlight) {
                selected_results = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();
                if (do_high != null)
                    return this.result_do_highlight(do_high)
            }
        }, Chosen.prototype.no_results = function(terms) {
            var no_results_html;
            return no_results_html = $('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'), no_results_html.find("span").first().html(terms), this.search_results.append(no_results_html)
        }, Chosen.prototype.no_results_clear = function() {
            return this.search_results.find(".no-results").remove()
        }, Chosen.prototype.keydown_arrow = function() {
            var first_active, next_sib;
            this.result_highlight ? this.results_showing && (next_sib = this.result_highlight.nextAll("li.active-result").first(), next_sib && this.result_do_highlight(next_sib)) : (first_active = this.search_results.find("li.active-result").first(), first_active && this.result_do_highlight($(first_active)));
            if (!this.results_showing)
                return this.results_show()
        }, Chosen.prototype.keyup_arrow = function() {
            var prev_sibs;
            if (!this.results_showing && !this.is_multiple)
                return this.results_show();
            if (this.result_highlight)
                return prev_sibs = this.result_highlight.prevAll("li.active-result"), prev_sibs.length ? this.result_do_highlight(prev_sibs.first()) : (this.choices > 0 && this.results_hide(), this.result_clear_highlight())
        }, Chosen.prototype.keydown_backstroke = function() {
            var next_available_destroy;
            if (this.pending_backstroke)
                return this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke();
            next_available_destroy = this.search_container.siblings("li.search-choice").last();
            if (next_available_destroy.length && !next_available_destroy.hasClass("search-choice-disabled"))
                return this.pending_backstroke = next_available_destroy, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")
        }, Chosen.prototype.clear_backstroke = function() {
            return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
        }, Chosen.prototype.keydown_checker = function(evt) {
            var stroke, _ref;
            stroke = (_ref = evt.which) != null ? _ref : evt.keyCode, this.search_field_scale(), stroke !== 8 && this.pending_backstroke && this.clear_backstroke();
            switch (stroke) {
                case 8:
                    this.backstroke_length = this.search_field.val().length;
                    break;
                case 9:
                    this.results_showing && !this.is_multiple && this.result_select(evt), this.mouse_on_container = !1;
                    break;
                case 13:
                    evt.preventDefault();
                    break;
                case 38:
                    evt.preventDefault(), this.keyup_arrow();
                    break;
                case 40:
                    this.keydown_arrow()
            }
        }, Chosen.prototype.search_field_scale = function() {
            var dd_top, div, h, style, style_block, styles, w, _i, _len;
            if (this.is_multiple) {
                h = 0, w = 0, style_block = "position:absolute; left: -1000px; top: -1000px; display:none;", styles = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"];
                for (_i = 0, _len = styles.length; _i < _len; _i++)
                    style = styles[_i], style_block += style + ":" + this.search_field.css(style) + ";";
                return div = $("<div />", {style: style_block}), div.text(this.search_field.val()), $("body").append(div), w = div.width() + 25, div.remove(), w > this.f_width - 10 && (w = this.f_width - 10), this.search_field.css({width: w + "px"}), dd_top = this.container.height(), this.dropdown.css({top: dd_top + "px"})
            }
        }, Chosen.prototype.generate_random_id = function() {
            var string;
            string = "sel" + this.generate_random_char() + this.generate_random_char() + this.generate_random_char();
            while ($("#" + string).length > 0)
                string += this.generate_random_char();
            return string
        }, Chosen
    }(AbstractChosen), get_side_border_padding = function(elmt) {
        var side_border_padding;
        return side_border_padding = elmt.outerWidth() - elmt.width()
    }, root.get_side_border_padding = get_side_border_padding
}.call(this);


// hoverIntent
// http://cherne.net/brian/resources/jquery.hoverIntent.html
(function($) {
    $.fn.hoverIntent = function(f, g) {
        var cfg = {sensitivity: 7,interval: 100,timeout: 0};
        cfg = $.extend(cfg, g ? {over: f,out: g} : f);
        var cX, cY, pX, pY;
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY
        };
        var compare = function(ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
                $(ob).unbind("mousemove", track);
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob, [ev])
            } else {
                pX = cX;
                pY = cY;
                ob.hoverIntent_t = setTimeout(function() {
                    compare(ev, ob)
                }, cfg.interval)
            }
        };
        var delay = function(ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob, [ev])
        };
        var handleHover = function(e) {
            var ev = jQuery.extend({}, e);
            var ob = this;
            if (ob.hoverIntent_t) {
                ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t)
            }
            if (e.type == "mouseenter") {
                pX = ev.pageX;
                pY = ev.pageY;
                $(ob).bind("mousemove", track);
                if (ob.hoverIntent_s != 1) {
                    ob.hoverIntent_t = setTimeout(function() {
                        compare(ev, ob)
                    }, cfg.interval)
                }
            } else {
                $(ob).unbind("mousemove", track);
                if (ob.hoverIntent_s == 1) {
                    ob.hoverIntent_t = setTimeout(function() {
                        delay(ev, ob)
                    }, cfg.timeout)
                }
            }
        };
        return this.bind('mouseenter', handleHover).bind('mouseleave', handleHover)
    }
})(jQuery);


// Masonry
// http://masonry.desandro.com
(function(a, b, c) {
    "use strict";
    var d = b.event, e;
    d.special.smartresize = {setup: function() {
            b(this).bind("resize", d.special.smartresize.handler)
        },teardown: function() {
            b(this).unbind("resize", d.special.smartresize.handler)
        },handler: function(a, c) {
            var d = this, f = arguments;
            a.type = "smartresize", e && clearTimeout(e), e = setTimeout(function() {
                b.event.handle.apply(d, f)
            }, c === "execAsap" ? 0 : 100)
        }}, b.fn.smartresize = function(a) {
        return a ? this.bind("smartresize", a) : this.trigger("smartresize", ["execAsap"])
    }, b.Mason = function(a, c) {
        this.element = b(c), this._create(a), this._init()
    }, b.Mason.settings = {isResizable: !0,isAnimated: !1,animationOptions: {queue: !1,duration: 500},gutterWidth: 0,isRTL: !1,isFitWidth: !1,containerStyle: {position: "relative"}}, b.Mason.prototype = {_filterFindBricks: function(a) {
            var b = this.options.itemSelector;
            return b ? a.filter(b).add(a.find(b)) : a
        },_getBricks: function(a) {
            var b = this._filterFindBricks(a).css({position: "absolute"}).addClass("masonry-brick");
            return b
        },_create: function(c) {
            this.options = b.extend(!0, {}, b.Mason.settings, c), this.styleQueue = [];
            var d = this.element[0].style;
            this.originalStyle = {height: d.height || ""};
            var e = this.options.containerStyle;
            for (var f in e)
                this.originalStyle[f] = d[f] || "";
            this.element.css(e), this.horizontalDirection = this.options.isRTL ? "right" : "left", this.offset = {x: parseInt(this.element.css("padding-" + this.horizontalDirection), 10),y: parseInt(this.element.css("padding-top"), 10)}, this.isFluid = this.options.columnWidth && typeof this.options.columnWidth == "function";
            var g = this;
            setTimeout(function() {
                g.element.addClass("masonry")
            }, 0), this.options.isResizable && b(a).bind("smartresize.masonry", function() {
                g.resize()
            }), this.reloadItems()
        },_init: function(a) {
            this._getColumns(), this._reLayout(a)
        },option: function(a, c) {
            b.isPlainObject(a) && (this.options = b.extend(!0, this.options, a))
        },layout: function(a, b) {
            for (var c = 0, d = a.length; c < d; c++)
                this._placeBrick(a[c]);
            var e = {};
            e.height = Math.max.apply(Math, this.colYs);
            if (this.options.isFitWidth) {
                var f = 0;
                c = this.cols;
                while (--c) {
                    if (this.colYs[c] !== 0)
                        break;
                    f++
                }
                e.width = (this.cols - f) * this.columnWidth - this.options.gutterWidth
            }
            this.styleQueue.push({$el: this.element,style: e});
            var g = this.isLaidOut ? this.options.isAnimated ? "animate" : "css" : "css", h = this.options.animationOptions, i;
            for (c = 0, d = this.styleQueue.length; c < d; c++)
                i = this.styleQueue[c], i.$el[g](i.style, h);
            this.styleQueue = [], b && b.call(a), this.isLaidOut = !0
        },_getColumns: function() {
            var a = this.options.isFitWidth ? this.element.parent() : this.element, b = a.width();
            this.columnWidth = this.isFluid ? this.options.columnWidth(b) : this.options.columnWidth || this.$bricks.outerWidth(!0) || b, this.columnWidth += this.options.gutterWidth, this.cols = Math.floor((b + this.options.gutterWidth) / this.columnWidth), this.cols = Math.max(this.cols, 1)
        },_placeBrick: function(a) {
            var c = b(a), d, e, f, g, h;
            d = Math.ceil(c.outerWidth(!0) / this.columnWidth), d = Math.min(d, this.cols);
            if (d === 1)
                f = this.colYs;
            else {
                e = this.cols + 1 - d, f = [];
                for (h = 0; h < e; h++)
                    g = this.colYs.slice(h, h + d), f[h] = Math.max.apply(Math, g)
            }
            var i = Math.min.apply(Math, f), j = 0;
            for (var k = 0, l = f.length; k < l; k++)
                if (f[k] === i) {
                    j = k;
                    break
                }
            var m = {top: i + this.offset.y};
            m[this.horizontalDirection] = this.columnWidth * j + this.offset.x, this.styleQueue.push({$el: c,style: m});
            var n = i + c.outerHeight(!0), o = this.cols + 1 - l;
            for (k = 0; k < o; k++)
                this.colYs[j + k] = n
        },resize: function() {
            var a = this.cols;
            this._getColumns(), (this.isFluid || this.cols !== a) && this._reLayout()
        },_reLayout: function(a) {
            var b = this.cols;
            this.colYs = [];
            while (b--)
                this.colYs.push(0);
            this.layout(this.$bricks, a)
        },reloadItems: function() {
            this.$bricks = this._getBricks(this.element.children())
        },reload: function(a) {
            this.reloadItems(), this._init(a)
        },appended: function(a, b, c) {
            if (b) {
                this._filterFindBricks(a).css({top: this.element.height()});
                var d = this;
                setTimeout(function() {
                    d._appended(a, c)
                }, 1)
            } else
                this._appended(a, c)
        },_appended: function(a, b) {
            var c = this._getBricks(a);
            this.$bricks = this.$bricks.add(c), this.layout(c, b)
        },remove: function(a) {
            this.$bricks = this.$bricks.not(a), a.remove()
        },destroy: function() {
            this.$bricks.removeClass("masonry-brick").each(function() {
                this.style.position = "", this.style.top = "", this.style.left = ""
            });
            var c = this.element[0].style;
            for (var d in this.originalStyle)
                c[d] = this.originalStyle[d];
            this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"), b(a).unbind(".masonry")
        }}, b.fn.imagesLoaded = function(a) {
        function h() {
            a.call(c, d)
        }
        function i(a) {
            var c = a.target;
            c.src !== f && b.inArray(c, g) === -1 && (g.push(c), --e <= 0 && (setTimeout(h), d.unbind(".imagesLoaded", i)))
        }
        var c = this, d = c.find("img").add(c.filter("img")), e = d.length, f = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", g = [];
        return e || h(), d.bind("load.imagesLoaded error.imagesLoaded", i).each(function() {
            var a = this.src;
            this.src = f, this.src = a
        }), c
    };
    var f = function(b) {
        a.console && a.console.error(b)
    };
    b.fn.masonry = function(a) {
        if (typeof a == "string") {
            var c = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var d = b.data(this, "masonry");
                if (!d) {
                    f("cannot call methods on masonry prior to initialization; attempted to call method '" + a + "'");
                    return
                }
                if (!b.isFunction(d[a]) || a.charAt(0) === "_") {
                    f("no such method '" + a + "' for masonry instance");
                    return
                }
                d[a].apply(d, c)
            })
        } else
            this.each(function() {
                var c = b.data(this, "masonry");
                c ? (c.option(a || {}), c._init()) : b.data(this, "masonry", new b.Mason(a, this))
            });
        return this
    }
})(window, jQuery);


// jquery.timeago
// http://timeago.yarp.com/
(function($) {
    $.timeago = function(timestamp) {
        if (timestamp instanceof Date) {
            return inWords(timestamp);
        } else {
            if (typeof timestamp === "string") {
                return inWords($.timeago.parse(timestamp));
            } else {
                if (typeof timestamp === "number") {
                    return inWords(new Date(timestamp));
                } else {
                    return inWords($.timeago.datetime(timestamp));
                }
            }
        }
    };
    var $t = $.timeago;
    $.extend($.timeago, {settings: {refreshMillis: 60000,allowFuture: false,strings: {prefixAgo: null,prefixFromNow: null,suffixAgo: "ago",suffixFromNow: "from now",seconds: "less than a minute",minute: "a minute",minutes: "%d minutes",hour: "an hour",hours: "%d hours",day: "a day",days: "%d days",month: "a month",months: "%d months",year: "a year",years: "%d years",wordSeparator: " ",numbers: []}},inWords: function(distanceMillis) {
            var $l = this.settings.strings;
            var prefix = $l.prefixAgo;
            var suffix = $l.suffixAgo;
            if (this.settings.allowFuture) {
                if (distanceMillis < 0) {
                    prefix = $l.prefixFromNow;
                    suffix = $l.suffixFromNow;
                }
            }
            var seconds = Math.abs(distanceMillis) / 1000;
            var minutes = seconds / 60;
            var hours = minutes / 60;
            var days = hours / 24;
            var years = days / 365;
            function substitute(stringOrFunction, number) {
                var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
                var value = ($l.numbers && $l.numbers[number]) || number;
                return string.replace(/%d/i, value);
            }
            var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) || seconds < 90 && substitute($l.minute, 1) || minutes < 45 && substitute($l.minutes, Math.round(minutes)) || minutes < 90 && substitute($l.hour, 1) || hours < 24 && substitute($l.hours, Math.round(hours)) || hours < 42 && substitute($l.day, 1) || days < 30 && substitute($l.days, Math.round(days)) || days < 45 && substitute($l.month, 1) || days < 365 && substitute($l.months, Math.round(days / 30)) || years < 1.5 && substitute($l.year, 1) || substitute($l.years, Math.round(years));
            var separator = $l.wordSeparator === undefined ? " " : $l.wordSeparator;
            return $.trim([prefix, words, suffix].join(separator));
        },parse: function(iso8601) {
            var s = $.trim(iso8601);
            s = s.replace(/\.\d+/, "");
            s = s.replace(/-/, "/").replace(/-/, "/");
            s = s.replace(/T/, " ").replace(/Z/, " UTC");
            s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
            return new Date(s);
        },datetime: function(elem) {
            var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
            return $t.parse(iso8601);
        },isTime: function(elem) {
            return $(elem).get(0).tagName.toLowerCase() === "time";
        }});
    $.fn.timeago = function() {
        var self = this;
        self.each(refresh);
        var $s = $t.settings;
        if ($s.refreshMillis > 0) {
            setInterval(function() {
                self.each(refresh);
            }, $s.refreshMillis);
        }
        return self;
    };
    function refresh() {
        var data = prepareData(this);
        if (!isNaN(data.datetime)) {
            $(this).text(inWords(data.datetime));
        }
        return this;
    }
    function prepareData(element) {
        element = $(element);
        if (!element.data("timeago")) {
            element.data("timeago", {datetime: $t.datetime(element)});
            var text = $.trim(element.text());
            if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
                element.attr("title", text);
            }
        }
        return element.data("timeago");
    }
    function inWords(date) {
        return $t.inWords(distance(date));
    }
    function distance(date) {
        return (new Date().getTime() - date.getTime());
    }
    document.createElement("abbr");
    document.createElement("time");
}(jQuery));


// history.js (jquery.history.js)
// https://github.com/balupton/History.js/
window.JSON || (window.JSON = {}), function() {
    function f(a) {
        return a < 10 ? "0" + a : a
    }
    function quote(a) {
        return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function(a) {
            var b = meta[a];
            return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }
    function str(a, b) {
        var c, d, e, f, g = gap, h, i = b[a];
        i && typeof i == "object" && typeof i.toJSON == "function" && (i = i.toJSON(a)), typeof rep == "function" && (i = rep.call(b, a, i));
        switch (typeof i) {
            case "string":
                return quote(i);
            case "number":
                return isFinite(i) ? String(i) : "null";
            case "boolean":
            case "null":
                return String(i);
            case "object":
                if (!i)
                    return "null";
                gap += indent, h = [];
                if (Object.prototype.toString.apply(i) === "[object Array]") {
                    f = i.length;
                    for (c = 0; c < f; c += 1)
                        h[c] = str(c, i) || "null";
                    return e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g, e
                }
                if (rep && typeof rep == "object") {
                    f = rep.length;
                    for (c = 0; c < f; c += 1)
                        d = rep[c], typeof d == "string" && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e))
                } else
                    for (d in i)
                        Object.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
                return e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g, e
        }
    }
    "use strict", typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function(a) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) {
        return this.valueOf()
    });
    var JSON = window.JSON, cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b","\t": "\\t","\n": "\\n","\f": "\\f","\r": "\\r",'"': '\\"',"\\": "\\\\"}, rep;
    typeof JSON.stringify != "function" && (JSON.stringify = function(a, b, c) {
        var d;
        gap = "", indent = "";
        if (typeof c == "number")
            for (d = 0; d < c; d += 1)
                indent += " ";
        else
            typeof c == "string" && (indent = c);
        rep = b;
        if (!b || typeof b == "function" || typeof b == "object" && typeof b.length == "number")
            return str("", {"": a});
        throw new Error("JSON.stringify")
    }), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
        function walk(a, b) {
            var c, d, e = a[b];
            if (e && typeof e == "object")
                for (c in e)
                    Object.hasOwnProperty.call(e, c) && (d = walk(e, c), d !== undefined ? e[c] = d : delete e[c]);
            return reviver.call(a, b, e)
        }
        var j;
        text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
            return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({"": j}, "") : j;
        throw new SyntaxError("JSON.parse")
    })
}(), function(a, b) {
    "use strict";
    var c = a.History = a.History || {}, d = a.jQuery;
    if (typeof c.Adapter != "undefined")
        throw new Error("History.js Adapter has already been loaded...");
    c.Adapter = {bind: function(a, b, c) {
            d(a).bind(b, c)
        },trigger: function(a, b, c) {
            d(a).trigger(b, c)
        },extractEventData: function(a, c, d) {
            var e = c && c.originalEvent && c.originalEvent[a] || d && d[a] || b;
            return e
        },onDomLoad: function(a) {
            d(a)
        }}, typeof c.init != "undefined" && c.init()
}(window), function(a, b) {
    "use strict";
    var c = a.document, d = a.setTimeout || d, e = a.clearTimeout || e, f = a.setInterval || f, g = a.History = a.History || {};
    if (typeof g.initHtml4 != "undefined")
        throw new Error("History.js HTML4 Support has already been loaded...");
    g.initHtml4 = function() {
        if (typeof g.initHtml4.initialized != "undefined")
            return !1;
        g.initHtml4.initialized = !0, g.enabled = !0, g.savedHashes = [], g.isLastHash = function(a) {
            var b = g.getHashByIndex(), c;
            return c = a === b, c
        }, g.saveHash = function(a) {
            return g.isLastHash(a) ? !1 : (g.savedHashes.push(a), !0)
        }, g.getHashByIndex = function(a) {
            var b = null;
            return typeof a == "undefined" ? b = g.savedHashes[g.savedHashes.length - 1] : a < 0 ? b = g.savedHashes[g.savedHashes.length + a] : b = g.savedHashes[a], b
        }, g.discardedHashes = {}, g.discardedStates = {}, g.discardState = function(a, b, c) {
            var d = g.getHashByState(a), e;
            return e = {discardedState: a,backState: c,forwardState: b}, g.discardedStates[d] = e, !0
        }, g.discardHash = function(a, b, c) {
            var d = {discardedHash: a,backState: c,forwardState: b};
            return g.discardedHashes[a] = d, !0
        }, g.discardedState = function(a) {
            var b = g.getHashByState(a), c;
            return c = g.discardedStates[b] || !1, c
        }, g.discardedHash = function(a) {
            var b = g.discardedHashes[a] || !1;
            return b
        }, g.recycleState = function(a) {
            var b = g.getHashByState(a);
            return g.discardedState(a) && delete g.discardedStates[b], !0
        }, g.emulated.hashChange && (g.hashChangeInit = function() {
            g.checkerFunction = null;
            var b = "", d, e, h, i;
            return g.isInternetExplorer() ? (d = "historyjs-iframe", e = c.createElement("iframe"), e.setAttribute("id", d), e.style.display = "none", c.body.appendChild(e), e.contentWindow.document.open(), e.contentWindow.document.close(), h = "", i = !1, g.checkerFunction = function() {
                if (i)
                    return !1;
                i = !0;
                var c = g.getHash() || "", d = g.unescapeHash(e.contentWindow.document.location.hash) || "";
                return c !== b ? (b = c, d !== c && (h = d = c, e.contentWindow.document.open(), e.contentWindow.document.close(), e.contentWindow.document.location.hash = g.escapeHash(c)), g.Adapter.trigger(a, "hashchange")) : d !== h && (h = d, g.setHash(d, !1)), i = !1, !0
            }) : g.checkerFunction = function() {
                var c = g.getHash();
                return c !== b && (b = c, g.Adapter.trigger(a, "hashchange")), !0
            }, g.intervalList.push(f(g.checkerFunction, g.options.hashChangeInterval)), !0
        }, g.Adapter.onDomLoad(g.hashChangeInit)), g.emulated.pushState && (g.onHashChange = function(b) {
            var d = b && b.newURL || c.location.href, e = g.getHashByUrl(d), f = null, h = null, i = null, j;
            return g.isLastHash(e) ? (g.busy(!1), !1) : (g.doubleCheckComplete(), g.saveHash(e), e && g.isTraditionalAnchor(e) ? (g.Adapter.trigger(a, "anchorchange"), g.busy(!1), !1) : (f = g.extractState(g.getFullUrl(e || c.location.href, !1), !0), g.isLastSavedState(f) ? (g.busy(!1), !1) : (h = g.getHashByState(f), j = g.discardedState(f), j ? (g.getHashByIndex(-2) === g.getHashByState(j.forwardState) ? g.back(!1) : g.forward(!1), !1) : (g.pushState(f.data, f.title, f.url, !1), !0))))
        }, g.Adapter.bind(a, "hashchange", g.onHashChange), g.pushState = function(b, d, e, f) {
            if (g.getHashByUrl(e))
                throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
            if (f !== !1 && g.busy())
                return g.pushQueue({scope: g,callback: g.pushState,args: arguments,queue: f}), !1;
            g.busy(!0);
            var h = g.createStateObject(b, d, e), i = g.getHashByState(h), j = g.getState(!1), k = g.getHashByState(j), l = g.getHash();
            return g.storeState(h), g.expectedStateId = h.id, g.recycleState(h), g.setTitle(h), i === k ? (g.busy(!1), !1) : i !== l && i !== g.getShortUrl(c.location.href) ? (g.setHash(i, !1), !1) : (g.saveState(h), g.Adapter.trigger(a, "statechange"), g.busy(!1), !0)
        }, g.replaceState = function(a, b, c, d) {
            if (g.getHashByUrl(c))
                throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
            if (d !== !1 && g.busy())
                return g.pushQueue({scope: g,callback: g.replaceState,args: arguments,queue: d}), !1;
            g.busy(!0);
            var e = g.createStateObject(a, b, c), f = g.getState(!1), h = g.getStateByIndex(-2);
            return g.discardState(f, e, h), g.pushState(e.data, e.title, e.url, !1), !0
        }), g.emulated.pushState && g.getHash() && !g.emulated.hashChange && g.Adapter.onDomLoad(function() {
            g.Adapter.trigger(a, "hashchange")
        })
    }, typeof g.init != "undefined" && g.init()
}(window), function(a, b) {
    "use strict";
    var c = a.console || b, d = a.document, e = a.navigator, f = a.sessionStorage || !1, g = a.setTimeout, h = a.clearTimeout, i = a.setInterval, j = a.clearInterval, k = a.JSON, l = a.alert, m = a.History = a.History || {}, n = a.history;
    k.stringify = k.stringify || k.encode, k.parse = k.parse || k.decode;
    if (typeof m.init != "undefined")
        throw new Error("History.js Core has already been loaded...");
    m.init = function() {
        return typeof m.Adapter == "undefined" ? !1 : (typeof m.initCore != "undefined" && m.initCore(), typeof m.initHtml4 != "undefined" && m.initHtml4(), !0)
    }, m.initCore = function() {
        if (typeof m.initCore.initialized != "undefined")
            return !1;
        m.initCore.initialized = !0, m.options = m.options || {}, m.options.hashChangeInterval = m.options.hashChangeInterval || 100, m.options.safariPollInterval = m.options.safariPollInterval || 500, m.options.doubleCheckInterval = m.options.doubleCheckInterval || 500, m.options.storeInterval = m.options.storeInterval || 1e3, m.options.busyDelay = m.options.busyDelay || 250, m.options.debug = m.options.debug || !1, m.options.initialTitle = m.options.initialTitle || d.title, m.intervalList = [], m.clearAllIntervals = function() {
            var a, b = m.intervalList;
            if (typeof b != "undefined" && b !== null) {
                for (a = 0; a < b.length; a++)
                    j(b[a]);
                m.intervalList = null
            }
        }, m.debug = function() {
            (m.options.debug || !1) && m.log.apply(m, arguments)
        }, m.log = function() {
            var a = typeof c != "undefined" && typeof c.log != "undefined" && typeof c.log.apply != "undefined", b = d.getElementById("log"), e, f, g, h, i;
            a ? (h = Array.prototype.slice.call(arguments), e = h.shift(), typeof c.debug != "undefined" ? c.debug.apply(c, [e, h]) : c.log.apply(c, [e, h])) : e = "\n" + arguments[0] + "\n";
            for (f = 1, g = arguments.length; f < g; ++f) {
                i = arguments[f];
                if (typeof i == "object" && typeof k != "undefined")
                    try {
                        i = k.stringify(i)
                    } catch (j) {
                    }
                e += "\n" + i + "\n"
            }
            return b ? (b.value += e + "\n-----\n", b.scrollTop = b.scrollHeight - b.clientHeight) : a || l(e), !0
        }, m.getInternetExplorerMajorVersion = function() {
            var a = m.getInternetExplorerMajorVersion.cached = typeof m.getInternetExplorerMajorVersion.cached != "undefined" ? m.getInternetExplorerMajorVersion.cached : function() {
                var a = 3, b = d.createElement("div"), c = b.getElementsByTagName("i");
                while ((b.innerHTML = "<!--[if gt IE " + ++a + "]><i></i><![endif]-->") && c[0])
                    ;
                return a > 4 ? a : !1
            }();
            return a
        }, m.isInternetExplorer = function() {
            var a = m.isInternetExplorer.cached = typeof m.isInternetExplorer.cached != "undefined" ? m.isInternetExplorer.cached : Boolean(m.getInternetExplorerMajorVersion());
            return a
        }, m.emulated = {pushState: !Boolean(a.history && a.history.pushState && a.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),hashChange: Boolean(!("onhashchange" in a || "onhashchange" in d) || m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8)}, m.enabled = !m.emulated.pushState, m.bugs = {setHash: Boolean(!m.emulated.pushState && e.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),safariPoll: Boolean(!m.emulated.pushState && e.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),ieDoubleCheck: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8),hashEscape: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 7)}, m.isEmptyObject = function(a) {
            for (var b in a)
                return !1;
            return !0
        }, m.cloneObject = function(a) {
            var b, c;
            return a ? (b = k.stringify(a), c = k.parse(b)) : c = {}, c
        }, m.getRootUrl = function() {
            var a = d.location.protocol + "//" + (d.location.hostname || d.location.host);
            if (d.location.port || !1)
                a += ":" + d.location.port;
            return a += "/", a
        }, m.getBaseHref = function() {
            var a = d.getElementsByTagName("base"), b = null, c = "";
            return a.length === 1 && (b = a[0], c = b.href.replace(/[^\/]+$/, "")), c = c.replace(/\/+$/, ""), c && (c += "/"), c
        }, m.getBaseUrl = function() {
            var a = m.getBaseHref() || m.getBasePageUrl() || m.getRootUrl();
            return a
        }, m.getPageUrl = function() {
            var a = m.getState(!1, !1), b = (a || {}).url || d.location.href, c;
            return c = b.replace(/\/+$/, "").replace(/[^\/]+$/, function(a, b, c) {
                return /\./.test(a) ? a : a + "/"
            }), c
        }, m.getBasePageUrl = function() {
            var a = d.location.href.replace(/[#\?].*/, "").replace(/[^\/]+$/, function(a, b, c) {
                return /[^\/]$/.test(a) ? "" : a
            }).replace(/\/+$/, "") + "/";
            return a
        }, m.getFullUrl = function(a, b) {
            var c = a, d = a.substring(0, 1);
            return b = typeof b == "undefined" ? !0 : b, /[a-z]+\:\/\//.test(a) || (d === "/" ? c = m.getRootUrl() + a.replace(/^\/+/, "") : d === "#" ? c = m.getPageUrl().replace(/#.*/, "") + a : d === "?" ? c = m.getPageUrl().replace(/[\?#].*/, "") + a : b ? c = m.getBaseUrl() + a.replace(/^(\.\/)+/, "") : c = m.getBasePageUrl() + a.replace(/^(\.\/)+/, "")), c.replace(/\#$/, "")
        }, m.getShortUrl = function(a) {
            var b = a, c = m.getBaseUrl(), d = m.getRootUrl();
            return m.emulated.pushState && (b = b.replace(c, "")), b = b.replace(d, "/"), m.isTraditionalAnchor(b) && (b = "./" + b), b = b.replace(/^(\.\/)+/g, "./").replace(/\#$/, ""), b
        }, m.store = {}, m.idToState = m.idToState || {}, m.stateToId = m.stateToId || {}, m.urlToId = m.urlToId || {}, m.storedStates = m.storedStates || [], m.savedStates = m.savedStates || [], m.normalizeStore = function() {
            m.store.idToState = m.store.idToState || {}, m.store.urlToId = m.store.urlToId || {}, m.store.stateToId = m.store.stateToId || {}
        }, m.getState = function(a, b) {
            typeof a == "undefined" && (a = !0), typeof b == "undefined" && (b = !0);
            var c = m.getLastSavedState();
            return !c && b && (c = m.createStateObject()), a && (c = m.cloneObject(c), c.url = c.cleanUrl || c.url), c
        }, m.getIdByState = function(a) {
            var b = m.extractId(a.url), c;
            if (!b) {
                c = m.getStateString(a);
                if (typeof m.stateToId[c] != "undefined")
                    b = m.stateToId[c];
                else if (typeof m.store.stateToId[c] != "undefined")
                    b = m.store.stateToId[c];
                else {
                    for (; ; ) {
                        b = (new Date).getTime() + String(Math.random()).replace(/\D/g, "");
                        if (typeof m.idToState[b] == "undefined" && typeof m.store.idToState[b] == "undefined")
                            break
                    }
                    m.stateToId[c] = b, m.idToState[b] = a
                }
            }
            return b
        }, m.normalizeState = function(a) {
            var b, c;
            if (!a || typeof a != "object")
                a = {};
            if (typeof a.normalized != "undefined")
                return a;
            if (!a.data || typeof a.data != "object")
                a.data = {};
            b = {}, b.normalized = !0, b.title = a.title || "", b.url = m.getFullUrl(m.unescapeString(a.url || d.location.href)), b.hash = m.getShortUrl(b.url), b.data = m.cloneObject(a.data), b.id = m.getIdByState(b), b.cleanUrl = b.url.replace(/\??\&_suid.*/, ""), b.url = b.cleanUrl, c = !m.isEmptyObject(b.data);
            if (b.title || c)
                b.hash = m.getShortUrl(b.url).replace(/\??\&_suid.*/, ""), /\?/.test(b.hash) || (b.hash += "?"), b.hash += "&_suid=" + b.id;
            return b.hashedUrl = m.getFullUrl(b.hash), (m.emulated.pushState || m.bugs.safariPoll) && m.hasUrlDuplicate(b) && (b.url = b.hashedUrl), b
        }, m.createStateObject = function(a, b, c) {
            var d = {data: a,title: b,url: c};
            return d = m.normalizeState(d), d
        }, m.getStateById = function(a) {
            a = String(a);
            var c = m.idToState[a] || m.store.idToState[a] || b;
            return c
        }, m.getStateString = function(a) {
            var b, c, d;
            return b = m.normalizeState(a), c = {data: b.data,title: a.title,url: a.url}, d = k.stringify(c), d
        }, m.getStateId = function(a) {
            var b, c;
            return b = m.normalizeState(a), c = b.id, c
        }, m.getHashByState = function(a) {
            var b, c;
            return b = m.normalizeState(a), c = b.hash, c
        }, m.extractId = function(a) {
            var b, c, d;
            return c = /(.*)\&_suid=([0-9]+)$/.exec(a), d = c ? c[1] || a : a, b = c ? String(c[2] || "") : "", b || !1
        }, m.isTraditionalAnchor = function(a) {
            var b = !/[\/\?\.]/.test(a);
            return b
        }, m.extractState = function(a, b) {
            var c = null, d, e;
            return b = b || !1, d = m.extractId(a), d && (c = m.getStateById(d)), c || (e = m.getFullUrl(a), d = m.getIdByUrl(e) || !1, d && (c = m.getStateById(d)), !c && b && !m.isTraditionalAnchor(a) && (c = m.createStateObject(null, null, e))), c
        }, m.getIdByUrl = function(a) {
            var c = m.urlToId[a] || m.store.urlToId[a] || b;
            return c
        }, m.getLastSavedState = function() {
            return m.savedStates[m.savedStates.length - 1] || b
        }, m.getLastStoredState = function() {
            return m.storedStates[m.storedStates.length - 1] || b
        }, m.hasUrlDuplicate = function(a) {
            var b = !1, c;
            return c = m.extractState(a.url), b = c && c.id !== a.id, b
        }, m.storeState = function(a) {
            return m.urlToId[a.url] = a.id, m.storedStates.push(m.cloneObject(a)), a
        }, m.isLastSavedState = function(a) {
            var b = !1, c, d, e;
            return m.savedStates.length && (c = a.id, d = m.getLastSavedState(), e = d.id, b = c === e), b
        }, m.saveState = function(a) {
            return m.isLastSavedState(a) ? !1 : (m.savedStates.push(m.cloneObject(a)), !0)
        }, m.getStateByIndex = function(a) {
            var b = null;
            return typeof a == "undefined" ? b = m.savedStates[m.savedStates.length - 1] : a < 0 ? b = m.savedStates[m.savedStates.length + a] : b = m.savedStates[a], b
        }, m.getHash = function() {
            var a = m.unescapeHash(d.location.hash);
            return a
        }, m.unescapeString = function(b) {
            var c = b, d;
            for (; ; ) {
                d = a.unescape(c);
                if (d === c)
                    break;
                c = d
            }
            return c
        }, m.unescapeHash = function(a) {
            var b = m.normalizeHash(a);
            return b = m.unescapeString(b), b
        }, m.normalizeHash = function(a) {
            var b = a.replace(/[^#]*#/, "").replace(/#.*/, "");
            return b
        }, m.setHash = function(a, b) {
            var c, e, f;
            return b !== !1 && m.busy() ? (m.pushQueue({scope: m,callback: m.setHash,args: arguments,queue: b}), !1) : (c = m.escapeHash(a), m.busy(!0), e = m.extractState(a, !0), e && !m.emulated.pushState ? m.pushState(e.data, e.title, e.url, !1) : d.location.hash !== c && (m.bugs.setHash ? (f = m.getPageUrl(), m.pushState(null, null, f + "#" + c, !1)) : d.location.hash = c), m)
        }, m.escapeHash = function(b) {
            var c = m.normalizeHash(b);
            return c = a.escape(c), m.bugs.hashEscape || (c = c.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), c
        }, m.getHashByUrl = function(a) {
            var b = String(a).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
            return b = m.unescapeHash(b), b
        }, m.setTitle = function(a) {
            var b = a.title, c;
            b || (c = m.getStateByIndex(0), c && c.url === a.url && (b = c.title || m.options.initialTitle));
            try {
                d.getElementsByTagName("title")[0].innerHTML = b.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
            } catch (e) {
            }
            return d.title = b, m
        }, m.queues = [], m.busy = function(a) {
            typeof a != "undefined" ? m.busy.flag = a : typeof m.busy.flag == "undefined" && (m.busy.flag = !1);
            if (!m.busy.flag) {
                h(m.busy.timeout);
                var b = function() {
                    var a, c, d;
                    if (m.busy.flag)
                        return;
                    for (a = m.queues.length - 1; a >= 0; --a) {
                        c = m.queues[a];
                        if (c.length === 0)
                            continue;
                        d = c.shift(), m.fireQueueItem(d), m.busy.timeout = g(b, m.options.busyDelay)
                    }
                };
                m.busy.timeout = g(b, m.options.busyDelay)
            }
            return m.busy.flag
        }, m.busy.flag = !1, m.fireQueueItem = function(a) {
            return a.callback.apply(a.scope || m, a.args || [])
        }, m.pushQueue = function(a) {
            return m.queues[a.queue || 0] = m.queues[a.queue || 0] || [], m.queues[a.queue || 0].push(a), m
        }, m.queue = function(a, b) {
            return typeof a == "function" && (a = {callback: a}), typeof b != "undefined" && (a.queue = b), m.busy() ? m.pushQueue(a) : m.fireQueueItem(a), m
        }, m.clearQueue = function() {
            return m.busy.flag = !1, m.queues = [], m
        }, m.stateChanged = !1, m.doubleChecker = !1, m.doubleCheckComplete = function() {
            return m.stateChanged = !0, m.doubleCheckClear(), m
        }, m.doubleCheckClear = function() {
            return m.doubleChecker && (h(m.doubleChecker), m.doubleChecker = !1), m
        }, m.doubleCheck = function(a) {
            return m.stateChanged = !1, m.doubleCheckClear(), m.bugs.ieDoubleCheck && (m.doubleChecker = g(function() {
                return m.doubleCheckClear(), m.stateChanged || a(), !0
            }, m.options.doubleCheckInterval)), m
        }, m.safariStatePoll = function() {
            var b = m.extractState(d.location.href), c;
            if (!m.isLastSavedState(b))
                c = b;
            else
                return;
            return c || (c = m.createStateObject()), m.Adapter.trigger(a, "popstate"), m
        }, m.back = function(a) {
            return a !== !1 && m.busy() ? (m.pushQueue({scope: m,callback: m.back,args: arguments,queue: a}), !1) : (m.busy(!0), m.doubleCheck(function() {
                m.back(!1)
            }), n.go(-1), !0)
        }, m.forward = function(a) {
            return a !== !1 && m.busy() ? (m.pushQueue({scope: m,callback: m.forward,args: arguments,queue: a}), !1) : (m.busy(!0), m.doubleCheck(function() {
                m.forward(!1)
            }), n.go(1), !0)
        }, m.go = function(a, b) {
            var c;
            if (a > 0)
                for (c = 1; c <= a; ++c)
                    m.forward(b);
            else {
                if (!(a < 0))
                    throw new Error("History.go: History.go requires a positive or negative integer passed.");
                for (c = -1; c >= a; --c)
                    m.back(b)
            }
            return m
        };
        if (m.emulated.pushState) {
            var o = function() {
            };
            m.pushState = m.pushState || o, m.replaceState = m.replaceState || o
        } else
            m.onPopState = function(b, c) {
                var e = !1, f = !1, g, h;
                return m.doubleCheckComplete(), g = m.getHash(), g ? (h = m.extractState(g || d.location.href, !0), h ? m.replaceState(h.data, h.title, h.url, !1) : (m.Adapter.trigger(a, "anchorchange"), m.busy(!1)), m.expectedStateId = !1, !1) : (e = m.Adapter.extractEventData("state", b, c) || !1, e ? f = m.getStateById(e) : m.expectedStateId ? f = m.getStateById(m.expectedStateId) : f = m.extractState(d.location.href), f || (f = m.createStateObject(null, null, d.location.href)), m.expectedStateId = !1, m.isLastSavedState(f) ? (m.busy(!1), !1) : (m.storeState(f), m.saveState(f), m.setTitle(f), m.Adapter.trigger(a, "statechange"), m.busy(!1), !0))
            }, m.Adapter.bind(a, "popstate", m.onPopState), m.pushState = function(b, c, d, e) {
                if (m.getHashByUrl(d) && m.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (e !== !1 && m.busy())
                    return m.pushQueue({scope: m,callback: m.pushState,args: arguments,queue: e}), !1;
                m.busy(!0);
                var f = m.createStateObject(b, c, d);
                return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f), m.expectedStateId = f.id, n.pushState(f.id, f.title, f.url), m.Adapter.trigger(a, "popstate")), !0
            }, m.replaceState = function(b, c, d, e) {
                if (m.getHashByUrl(d) && m.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (e !== !1 && m.busy())
                    return m.pushQueue({scope: m,callback: m.replaceState,args: arguments,queue: e}), !1;
                m.busy(!0);
                var f = m.createStateObject(b, c, d);
                return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f), m.expectedStateId = f.id, n.replaceState(f.id, f.title, f.url), m.Adapter.trigger(a, "popstate")), !0
            };
        if (f) {
            try {
                m.store = k.parse(f.getItem("History.store")) || {}
            } catch (p) {
                m.store = {}
            }
            m.normalizeStore()
        } else
            m.store = {}, m.normalizeStore();
        m.Adapter.bind(a, "beforeunload", m.clearAllIntervals), m.Adapter.bind(a, "unload", m.clearAllIntervals), m.saveState(m.storeState(m.extractState(d.location.href, !0))), f && (m.onUnload = function() {
            var a, b;
            try {
                a = k.parse(f.getItem("History.store")) || {}
            } catch (c) {
                a = {}
            }
            a.idToState = a.idToState || {}, a.urlToId = a.urlToId || {}, a.stateToId = a.stateToId || {};
            for (b in m.idToState) {
                if (!m.idToState.hasOwnProperty(b))
                    continue;
                a.idToState[b] = m.idToState[b]
            }
            for (b in m.urlToId) {
                if (!m.urlToId.hasOwnProperty(b))
                    continue;
                a.urlToId[b] = m.urlToId[b]
            }
            for (b in m.stateToId) {
                if (!m.stateToId.hasOwnProperty(b))
                    continue;
                a.stateToId[b] = m.stateToId[b]
            }
            m.store = a, m.normalizeStore(), f.setItem("History.store", k.stringify(a))
        }, m.intervalList.push(i(m.onUnload, m.options.storeInterval)), m.Adapter.bind(a, "beforeunload", m.onUnload), m.Adapter.bind(a, "unload", m.onUnload));
        if (!m.emulated.pushState) {
            m.bugs.safariPoll && m.intervalList.push(i(m.safariStatePoll, m.options.safariPollInterval));
            if (e.vendor === "Apple Computer, Inc." || (e.appCodeName || "") === "Mozilla")
                m.Adapter.bind(a, "hashchange", function() {
                    m.Adapter.trigger(a, "popstate")
                }), m.getHash() && m.Adapter.onDomLoad(function() {
                    m.Adapter.trigger(a, "hashchange")
                })
        }
    }, m.init()
}(window);


// jQuery Cycle
// http://jquery.malsup.com/cycle
(function($, undefined) {
    var ver = "2.9999.8";
    if ($.support === undefined) {
        $.support = {opacity: !($.browser.msie)};
    }
    function debug(s) {
        if ($.fn.cycle.debug) {
            log(s);
        }
    }
    function log() {
        if (window.console && console.log) {
            console.log("[cycle] " + Array.prototype.join.call(arguments, " "));
        }
    }
    $.expr[":"].paused = function(el) {
        return el.cyclePause;
    };
    $.fn.cycle = function(options, arg2) {
        var o = {s: this.selector,c: this.context};
        if (this.length === 0 && options != "stop") {
            if (!$.isReady && o.s) {
                log("DOM not ready, queuing slideshow");
                $(function() {
                    $(o.s, o.c).cycle(options, arg2);
                });
                return this;
            }
            log("terminating; zero elements found by selector" + ($.isReady ? "" : " (DOM not ready)"));
            return this;
        }
        return this.each(function() {
            var opts = handleArguments(this, options, arg2);
            if (opts === false) {
                return;
            }
            opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
            if (this.cycleTimeout) {
                clearTimeout(this.cycleTimeout);
            }
            this.cycleTimeout = this.cyclePause = 0;
            this.cycleStop = 0;
            var $cont = $(this);
            var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
            var els = $slides.get();
            if (els.length < 2) {
                log("terminating; too few slides: " + els.length);
                return;
            }
            var opts2 = buildOptions($cont, $slides, els, opts, o);
            if (opts2 === false) {
                return;
            }
            var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);
            if (startTime) {
                startTime += (opts2.delay || 0);
                if (startTime < 10) {
                    startTime = 10;
                }
                debug("first timeout: " + startTime);
                this.cycleTimeout = setTimeout(function() {
                    go(els, opts2, 0, !opts.backwards);
                }, startTime);
            }
        });
    };
    function triggerPause(cont, byHover, onPager) {
        var opts = $(cont).data("cycle.opts");
        if (!opts) {
            return;
        }
        var paused = !!cont.cyclePause;
        if (paused && opts.paused) {
            opts.paused(cont, opts, byHover, onPager);
        } else {
            if (!paused && opts.resumed) {
                opts.resumed(cont, opts, byHover, onPager);
            }
        }
    }
    function handleArguments(cont, options, arg2) {
        if (cont.cycleStop === undefined) {
            cont.cycleStop = 0;
        }
        if (options === undefined || options === null) {
            options = {};
        }
        if (options.constructor == String) {
            switch (options) {
                case "destroy":
                case "stop":
                    var opts = $(cont).data("cycle.opts");
                    if (!opts) {
                        return false;
                    }
                    cont.cycleStop++;
                    if (cont.cycleTimeout) {
                        clearTimeout(cont.cycleTimeout);
                    }
                    cont.cycleTimeout = 0;
                    if (opts.elements) {
                        $(opts.elements).stop();
                    }
                    $(cont).removeData("cycle.opts");
                    if (options == "destroy") {
                        destroy(cont, opts);
                    }
                    return false;
                case "toggle":
                    cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
                    checkInstantResume(cont.cyclePause, arg2, cont);
                    triggerPause(cont);
                    return false;
                case "pause":
                    cont.cyclePause = 1;
                    triggerPause(cont);
                    return false;
                case "resume":
                    cont.cyclePause = 0;
                    checkInstantResume(false, arg2, cont);
                    triggerPause(cont);
                    return false;
                case "prev":
                case "next":
                    opts = $(cont).data("cycle.opts");
                    if (!opts) {
                        log('options not found, "prev/next" ignored');
                        return false;
                    }
                    $.fn.cycle[options](opts);
                    return false;
                default:
                    options = {fx: options};
            }
            return options;
        } else {
            if (options.constructor == Number) {
                var num = options;
                options = $(cont).data("cycle.opts");
                if (!options) {
                    log("options not found, can not advance slide");
                    return false;
                }
                if (num < 0 || num >= options.elements.length) {
                    log("invalid slide index: " + num);
                    return false;
                }
                options.nextSlide = num;
                if (cont.cycleTimeout) {
                    clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0;
                }
                if (typeof arg2 == "string") {
                    options.oneTimeFx = arg2;
                }
                go(options.elements, options, 1, num >= options.currSlide);
                return false;
            }
        }
        return options;
        function checkInstantResume(isPaused, arg2, cont) {
            if (!isPaused && arg2 === true) {
                var options = $(cont).data("cycle.opts");
                if (!options) {
                    log("options not found, can not resume");
                    return false;
                }
                if (cont.cycleTimeout) {
                    clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0;
                }
                go(options.elements, options, 1, !options.backwards);
            }
        }
    }
    function removeFilter(el, opts) {
        if (!$.support.opacity && opts.cleartype && el.style.filter) {
            try {
                el.style.removeAttribute("filter");
            } catch (smother) {
            }
        }
    }
    function destroy(cont, opts) {
        if (opts.next) {
            $(opts.next).unbind(opts.prevNextEvent);
        }
        if (opts.prev) {
            $(opts.prev).unbind(opts.prevNextEvent);
        }
        if (opts.pager || opts.pagerAnchorBuilder) {
            $.each(opts.pagerAnchors || [], function() {
                this.unbind().remove();
            });
        }
        opts.pagerAnchors = null;
        $(cont).unbind("mouseenter.cycle mouseleave.cycle");
        if (opts.destroy) {
            opts.destroy(opts);
        }
    }
    function buildOptions($cont, $slides, els, options, o) {
        var startingSlideSpecified;
        var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
        var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
        if (meta) {
            opts = $.extend(opts, meta);
        }
        if (opts.autostop) {
            opts.countdown = opts.autostopCount || els.length;
        }
        var cont = $cont[0];
        $cont.data("cycle.opts", opts);
        opts.$cont = $cont;
        opts.stopCount = cont.cycleStop;
        opts.elements = els;
        opts.before = opts.before ? [opts.before] : [];
        opts.after = opts.after ? [opts.after] : [];
        if (!$.support.opacity && opts.cleartype) {
            opts.after.push(function() {
                removeFilter(this, opts);
            });
        }
        if (opts.continuous) {
            opts.after.push(function() {
                go(els, opts, 0, !opts.backwards);
            });
        }
        saveOriginalOpts(opts);
        if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg) {
            clearTypeFix($slides);
        }
        if ($cont.css("position") == "static") {
            $cont.css("position", "relative");
        }
        if (opts.width) {
            $cont.width(opts.width);
        }
        if (opts.height && opts.height != "auto") {
            $cont.height(opts.height);
        }
        if (opts.startingSlide !== undefined) {
            opts.startingSlide = parseInt(opts.startingSlide, 10);
            if (opts.startingSlide >= els.length || opts.startSlide < 0) {
                opts.startingSlide = 0;
            } else {
                startingSlideSpecified = true;
            }
        } else {
            if (opts.backwards) {
                opts.startingSlide = els.length - 1;
            } else {
                opts.startingSlide = 0;
            }
        }
        if (opts.random) {
            opts.randomMap = [];
            for (var i = 0; i < els.length; i++) {
                opts.randomMap.push(i);
            }
            opts.randomMap.sort(function(a, b) {
                return Math.random() - 0.5;
            });
            if (startingSlideSpecified) {
                for (var cnt = 0; cnt < els.length; cnt++) {
                    if (opts.startingSlide == opts.randomMap[cnt]) {
                        opts.randomIndex = cnt;
                    }
                }
            } else {
                opts.randomIndex = 1;
                opts.startingSlide = opts.randomMap[1];
            }
        } else {
            if (opts.startingSlide >= els.length) {
                opts.startingSlide = 0;
            }
        }
        opts.currSlide = opts.startingSlide || 0;
        var first = opts.startingSlide;
        $slides.css({position: "absolute",top: 0,left: 0}).hide().each(function(i) {
            var z;
            if (opts.backwards) {
                z = first ? i <= first ? els.length + (i - first) : first - i : els.length - i;
            } else {
                z = first ? i >= first ? els.length - (i - first) : first - i : els.length - i;
            }
            $(this).css("z-index", z);
        });
        $(els[first]).css("opacity", 1).show();
        removeFilter(els[first], opts);
        if (opts.fit) {
            if (!opts.aspect) {
                if (opts.width) {
                    $slides.width(opts.width);
                }
                if (opts.height && opts.height != "auto") {
                    $slides.height(opts.height);
                }
            } else {
                $slides.each(function() {
                    var $slide = $(this);
                    var ratio = (opts.aspect === true) ? $slide.width() / $slide.height() : opts.aspect;
                    if (opts.width && $slide.width() != opts.width) {
                        $slide.width(opts.width);
                        $slide.height(opts.width / ratio);
                    }
                    if (opts.height && $slide.height() < opts.height) {
                        $slide.height(opts.height);
                        $slide.width(opts.height * ratio);
                    }
                });
            }
        }
        if (opts.center && ((!opts.fit) || opts.aspect)) {
            $slides.each(function() {
                var $slide = $(this);
                $slide.css({"margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,"margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0});
            });
        }
        if (opts.center && !opts.fit && !opts.slideResize) {
            $slides.each(function() {
                var $slide = $(this);
                $slide.css({"margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,"margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0});
            });
        }
        var reshape = (opts.containerResize || opts.containerResizeHeight) && !$cont.innerHeight();
        if (reshape) {
            var maxw = 0, maxh = 0;
            for (var j = 0; j < els.length; j++) {
                var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
                if (!w) {
                    w = e.offsetWidth || e.width || $e.attr("width");
                }
                if (!h) {
                    h = e.offsetHeight || e.height || $e.attr("height");
                }
                maxw = w > maxw ? w : maxw;
                maxh = h > maxh ? h : maxh;
            }
            if (opts.containerResize && maxw > 0 && maxh > 0) {
                $cont.css({width: maxw + "px",height: maxh + "px"});
            }
            if (opts.containerResizeHeight && maxh > 0) {
                $cont.css({height: maxh + "px"});
            }
        }
        var pauseFlag = false;
        if (opts.pause) {
            $cont.bind("mouseenter.cycle", function() {
                pauseFlag = true;
                this.cyclePause++;
                triggerPause(cont, true);
            }).bind("mouseleave.cycle", function() {
                if (pauseFlag) {
                    this.cyclePause--;
                }
                triggerPause(cont, true);
            });
        }
        if (supportMultiTransitions(opts) === false) {
            return false;
        }
        var requeue = false;
        options.requeueAttempts = options.requeueAttempts || 0;
        $slides.each(function() {
            var $el = $(this);
            this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr("height") || 0);
            this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr("width") || 0);
            if ($el.is("img")) {
                var loadingIE = ($.browser.msie && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
                var loadingFF = ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
                var loadingOp = ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
                var loadingOther = (this.cycleH === 0 && this.cycleW === 0 && !this.complete);
                if (loadingIE || loadingFF || loadingOp || loadingOther) {
                    if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) {
                        log(options.requeueAttempts, " - img slide not loaded, requeuing slideshow: ", this.src, this.cycleW, this.cycleH);
                        setTimeout(function() {
                            $(o.s, o.c).cycle(options);
                        }, opts.requeueTimeout);
                        requeue = true;
                        return false;
                    } else {
                        log("could not determine size of image: " + this.src, this.cycleW, this.cycleH);
                    }
                }
            }
            return true;
        });
        if (requeue) {
            return false;
        }
        opts.cssBefore = opts.cssBefore || {};
        opts.cssAfter = opts.cssAfter || {};
        opts.cssFirst = opts.cssFirst || {};
        opts.animIn = opts.animIn || {};
        opts.animOut = opts.animOut || {};
        $slides.not(":eq(" + first + ")").css(opts.cssBefore);
        $($slides[first]).css(opts.cssFirst);
        if (opts.timeout) {
            opts.timeout = parseInt(opts.timeout, 10);
            if (opts.speed.constructor == String) {
                opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed, 10);
            }
            if (!opts.sync) {
                opts.speed = opts.speed / 2;
            }
            var buffer = opts.fx == "none" ? 0 : opts.fx == "shuffle" ? 500 : 250;
            while ((opts.timeout - opts.speed) < buffer) {
                opts.timeout += opts.speed;
            }
        }
        if (opts.easing) {
            opts.easeIn = opts.easeOut = opts.easing;
        }
        if (!opts.speedIn) {
            opts.speedIn = opts.speed;
        }
        if (!opts.speedOut) {
            opts.speedOut = opts.speed;
        }
        opts.slideCount = els.length;
        opts.currSlide = opts.lastSlide = first;
        if (opts.random) {
            if (++opts.randomIndex == els.length) {
                opts.randomIndex = 0;
            }
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        } else {
            if (opts.backwards) {
                opts.nextSlide = opts.startingSlide === 0 ? (els.length - 1) : opts.startingSlide - 1;
            } else {
                opts.nextSlide = opts.startingSlide >= (els.length - 1) ? 0 : opts.startingSlide + 1;
            }
        }
        if (!opts.multiFx) {
            var init = $.fn.cycle.transitions[opts.fx];
            if ($.isFunction(init)) {
                init($cont, $slides, opts);
            } else {
                if (opts.fx != "custom" && !opts.multiFx) {
                    log("unknown transition: " + opts.fx, "; slideshow terminating");
                    return false;
                }
            }
        }
        var e0 = $slides[first];
        if (!opts.skipInitializationCallbacks) {
            if (opts.before.length) {
                opts.before[0].apply(e0, [e0, e0, opts, true]);
            }
            if (opts.after.length) {
                opts.after[0].apply(e0, [e0, e0, opts, true]);
            }
        }
        if (opts.next) {
            $(opts.next).bind(opts.prevNextEvent, function() {
                return advance(opts, 1);
            });
        }
        if (opts.prev) {
            $(opts.prev).bind(opts.prevNextEvent, function() {
                return advance(opts, 0);
            });
        }
        if (opts.pager || opts.pagerAnchorBuilder) {
            buildPager(els, opts);
        }
        exposeAddSlide(opts, els);
        return opts;
    }
    function saveOriginalOpts(opts) {
        opts.original = {before: [],after: []};
        opts.original.cssBefore = $.extend({}, opts.cssBefore);
        opts.original.cssAfter = $.extend({}, opts.cssAfter);
        opts.original.animIn = $.extend({}, opts.animIn);
        opts.original.animOut = $.extend({}, opts.animOut);
        $.each(opts.before, function() {
            opts.original.before.push(this);
        });
        $.each(opts.after, function() {
            opts.original.after.push(this);
        });
    }
    function supportMultiTransitions(opts) {
        var i, tx, txs = $.fn.cycle.transitions;
        if (opts.fx.indexOf(",") > 0) {
            opts.multiFx = true;
            opts.fxs = opts.fx.replace(/\s*/g, "").split(",");
            for (i = 0; i < opts.fxs.length; i++) {
                var fx = opts.fxs[i];
                tx = txs[fx];
                if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
                    log("discarding unknown transition: ", fx);
                    opts.fxs.splice(i, 1);
                    i--;
                }
            }
            if (!opts.fxs.length) {
                log("No valid transitions named; slideshow terminating.");
                return false;
            }
        } else {
            if (opts.fx == "all") {
                opts.multiFx = true;
                opts.fxs = [];
                for (var p in txs) {
                    if (txs.hasOwnProperty(p)) {
                        tx = txs[p];
                        if (txs.hasOwnProperty(p) && $.isFunction(tx)) {
                            opts.fxs.push(p);
                        }
                    }
                }
            }
        }
        if (opts.multiFx && opts.randomizeEffects) {
            var r1 = Math.floor(Math.random() * 20) + 30;
            for (i = 0; i < r1; i++) {
                var r2 = Math.floor(Math.random() * opts.fxs.length);
                opts.fxs.push(opts.fxs.splice(r2, 1)[0]);
            }
            debug("randomized fx sequence: ", opts.fxs);
        }
        return true;
    }
    function exposeAddSlide(opts, els) {
        opts.addSlide = function(newSlide, prepend) {
            var $s = $(newSlide), s = $s[0];
            if (!opts.autostopCount) {
                opts.countdown++;
            }
            els[prepend ? "unshift" : "push"](s);
            if (opts.els) {
                opts.els[prepend ? "unshift" : "push"](s);
            }
            opts.slideCount = els.length;
            if (opts.random) {
                opts.randomMap.push(opts.slideCount - 1);
                opts.randomMap.sort(function(a, b) {
                    return Math.random() - 0.5;
                });
            }
            $s.css("position", "absolute");
            $s[prepend ? "prependTo" : "appendTo"](opts.$cont);
            if (prepend) {
                opts.currSlide++;
                opts.nextSlide++;
            }
            if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg) {
                clearTypeFix($s);
            }
            if (opts.fit && opts.width) {
                $s.width(opts.width);
            }
            if (opts.fit && opts.height && opts.height != "auto") {
                $s.height(opts.height);
            }
            s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
            s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();
            $s.css(opts.cssBefore);
            if (opts.pager || opts.pagerAnchorBuilder) {
                $.fn.cycle.createPagerAnchor(els.length - 1, s, $(opts.pager), els, opts);
            }
            if ($.isFunction(opts.onAddSlide)) {
                opts.onAddSlide($s);
            } else {
                $s.hide();
            }
        };
    }
    $.fn.cycle.resetState = function(opts, fx) {
        fx = fx || opts.fx;
        opts.before = [];
        opts.after = [];
        opts.cssBefore = $.extend({}, opts.original.cssBefore);
        opts.cssAfter = $.extend({}, opts.original.cssAfter);
        opts.animIn = $.extend({}, opts.original.animIn);
        opts.animOut = $.extend({}, opts.original.animOut);
        opts.fxFn = null;
        $.each(opts.original.before, function() {
            opts.before.push(this);
        });
        $.each(opts.original.after, function() {
            opts.after.push(this);
        });
        var init = $.fn.cycle.transitions[fx];
        if ($.isFunction(init)) {
            init(opts.$cont, $(opts.elements), opts);
        }
    };
    function go(els, opts, manual, fwd) {
        var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];
        if (manual && opts.busy && opts.manualTrump) {
            debug("manualTrump in go(), stopping active transition");
            $(els).stop(true, true);
            opts.busy = 0;
            clearTimeout(p.cycleTimeout);
        }
        if (opts.busy) {
            debug("transition active, ignoring new tx request");
            return;
        }
        if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual) {
            return;
        }
        if (!manual && !p.cyclePause && !opts.bounce && ((opts.autostop && (--opts.countdown <= 0)) || (opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
            if (opts.end) {
                opts.end(opts);
            }
            return;
        }
        var changed = false;
        if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
            changed = true;
            var fx = opts.fx;
            curr.cycleH = curr.cycleH || $(curr).height();
            curr.cycleW = curr.cycleW || $(curr).width();
            next.cycleH = next.cycleH || $(next).height();
            next.cycleW = next.cycleW || $(next).width();
            if (opts.multiFx) {
                if (fwd && (opts.lastFx === undefined || ++opts.lastFx >= opts.fxs.length)) {
                    opts.lastFx = 0;
                } else {
                    if (!fwd && (opts.lastFx === undefined || --opts.lastFx < 0)) {
                        opts.lastFx = opts.fxs.length - 1;
                    }
                }
                fx = opts.fxs[opts.lastFx];
            }
            if (opts.oneTimeFx) {
                fx = opts.oneTimeFx;
                opts.oneTimeFx = null;
            }
            $.fn.cycle.resetState(opts, fx);
            if (opts.before.length) {
                $.each(opts.before, function(i, o) {
                    if (p.cycleStop != opts.stopCount) {
                        return;
                    }
                    o.apply(next, [curr, next, opts, fwd]);
                });
            }
            var after = function() {
                opts.busy = 0;
                $.each(opts.after, function(i, o) {
                    if (p.cycleStop != opts.stopCount) {
                        return;
                    }
                    o.apply(next, [curr, next, opts, fwd]);
                });
                if (!p.cycleStop) {
                    queueNext();
                }
            };
            debug("tx firing(" + fx + "); currSlide: " + opts.currSlide + "; nextSlide: " + opts.nextSlide);
            opts.busy = 1;
            if (opts.fxFn) {
                opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
            } else {
                if ($.isFunction($.fn.cycle[opts.fx])) {
                    $.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
                } else {
                    $.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
                }
            }
        } else {
            queueNext();
        }
        if (changed || opts.nextSlide == opts.currSlide) {
            var roll;
            opts.lastSlide = opts.currSlide;
            if (opts.random) {
                opts.currSlide = opts.nextSlide;
                if (++opts.randomIndex == els.length) {
                    opts.randomIndex = 0;
                    opts.randomMap.sort(function(a, b) {
                        return Math.random() - 0.5;
                    });
                }
                opts.nextSlide = opts.randomMap[opts.randomIndex];
                if (opts.nextSlide == opts.currSlide) {
                    opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
                }
            } else {
                if (opts.backwards) {
                    roll = (opts.nextSlide - 1) < 0;
                    if (roll && opts.bounce) {
                        opts.backwards = !opts.backwards;
                        opts.nextSlide = 1;
                        opts.currSlide = 0;
                    } else {
                        opts.nextSlide = roll ? (els.length - 1) : opts.nextSlide - 1;
                        opts.currSlide = roll ? 0 : opts.nextSlide + 1;
                    }
                } else {
                    roll = (opts.nextSlide + 1) == els.length;
                    if (roll && opts.bounce) {
                        opts.backwards = !opts.backwards;
                        opts.nextSlide = els.length - 2;
                        opts.currSlide = els.length - 1;
                    } else {
                        opts.nextSlide = roll ? 0 : opts.nextSlide + 1;
                        opts.currSlide = roll ? els.length - 1 : opts.nextSlide - 1;
                    }
                }
            }
        }
        if (changed && opts.pager) {
            opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
        }
        function queueNext() {
            var ms = 0, timeout = opts.timeout;
            if (opts.timeout && !opts.continuous) {
                ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
                if (opts.fx == "shuffle") {
                    ms -= opts.speedOut;
                }
            } else {
                if (opts.continuous && p.cyclePause) {
                    ms = 10;
                }
            }
            if (ms > 0) {
                p.cycleTimeout = setTimeout(function() {
                    go(els, opts, 0, !opts.backwards);
                }, ms);
            }
        }
    }
    $.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
        $(pager).each(function() {
            $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
        });
    };
    function getTimeout(curr, next, opts, fwd) {
        if (opts.timeoutFn) {
            var t = opts.timeoutFn.call(curr, curr, next, opts, fwd);
            while (opts.fx != "none" && (t - opts.speed) < 250) {
                t += opts.speed;
            }
            debug("calculated timeout: " + t + "; speed: " + opts.speed);
            if (t !== false) {
                return t;
            }
        }
        return opts.timeout;
    }
    $.fn.cycle.next = function(opts) {
        advance(opts, 1);
    };
    $.fn.cycle.prev = function(opts) {
        advance(opts, 0);
    };
    function advance(opts, moveForward) {
        var val = moveForward ? 1 : -1;
        var els = opts.elements;
        var p = opts.$cont[0], timeout = p.cycleTimeout;
        if (timeout) {
            clearTimeout(timeout);
            p.cycleTimeout = 0;
        }
        if (opts.random && val < 0) {
            opts.randomIndex--;
            if (--opts.randomIndex == -2) {
                opts.randomIndex = els.length - 2;
            } else {
                if (opts.randomIndex == -1) {
                    opts.randomIndex = els.length - 1;
                }
            }
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        } else {
            if (opts.random) {
                opts.nextSlide = opts.randomMap[opts.randomIndex];
            } else {
                opts.nextSlide = opts.currSlide + val;
                if (opts.nextSlide < 0) {
                    if (opts.nowrap) {
                        return false;
                    }
                    opts.nextSlide = els.length - 1;
                } else {
                    if (opts.nextSlide >= els.length) {
                        if (opts.nowrap) {
                            return false;
                        }
                        opts.nextSlide = 0;
                    }
                }
            }
        }
        var cb = opts.onPrevNextEvent || opts.prevNextClick;
        if ($.isFunction(cb)) {
            cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
        }
        go(els, opts, 1, moveForward);
        return false;
    }
    function buildPager(els, opts) {
        var $p = $(opts.pager);
        $.each(els, function(i, o) {
            $.fn.cycle.createPagerAnchor(i, o, $p, els, opts);
        });
        opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
    }
    $.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
        var a;
        if ($.isFunction(opts.pagerAnchorBuilder)) {
            a = opts.pagerAnchorBuilder(i, el);
            debug("pagerAnchorBuilder(" + i + ", el) returned: " + a);
        } else {
            a = '<a href="#">' + (i + 1) + "</a>";
        }
        if (!a) {
            return;
        }
        var $a = $(a);
        if ($a.parents("body").length === 0) {
            var arr = [];
            if ($p.length > 1) {
                $p.each(function() {
                    var $clone = $a.clone(true);
                    $(this).append($clone);
                    arr.push($clone[0]);
                });
                $a = $(arr);
            } else {
                $a.appendTo($p);
            }
        }
        opts.pagerAnchors = opts.pagerAnchors || [];
        opts.pagerAnchors.push($a);
        var pagerFn = function(e) {
            e.preventDefault();
            opts.nextSlide = i;
            var p = opts.$cont[0], timeout = p.cycleTimeout;
            if (timeout) {
                clearTimeout(timeout);
                p.cycleTimeout = 0;
            }
            var cb = opts.onPagerEvent || opts.pagerClick;
            if ($.isFunction(cb)) {
                cb(opts.nextSlide, els[opts.nextSlide]);
            }
            go(els, opts, 1, opts.currSlide < i);
        };
        if (/mouseenter|mouseover/i.test(opts.pagerEvent)) {
            $a.hover(pagerFn, function() {
            });
        } else {
            $a.bind(opts.pagerEvent, pagerFn);
        }
        if (!/^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble) {
            $a.bind("click.cycle", function() {
                return false;
            });
        }
        var cont = opts.$cont[0];
        var pauseFlag = false;
        if (opts.pauseOnPagerHover) {
            $a.hover(function() {
                pauseFlag = true;
                cont.cyclePause++;
                triggerPause(cont, true, true);
            }, function() {
                if (pauseFlag) {
                    cont.cyclePause--;
                }
                triggerPause(cont, true, true);
            });
        }
    };
    $.fn.cycle.hopsFromLast = function(opts, fwd) {
        var hops, l = opts.lastSlide, c = opts.currSlide;
        if (fwd) {
            hops = c > l ? c - l : opts.slideCount - l;
        } else {
            hops = c < l ? l - c : l + opts.slideCount - c;
        }
        return hops;
    };
    function clearTypeFix($slides) {
        debug("applying clearType background-color hack");
        function hex(s) {
            s = parseInt(s, 10).toString(16);
            return s.length < 2 ? "0" + s : s;
        }
        function getBg(e) {
            for (; e && e.nodeName.toLowerCase() != "html"; e = e.parentNode) {
                var v = $.css(e, "background-color");
                if (v && v.indexOf("rgb") >= 0) {
                    var rgb = v.match(/\d+/g);
                    return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
                }
                if (v && v != "transparent") {
                    return v;
                }
            }
            return "#ffffff";
        }
        $slides.each(function() {
            $(this).css("background-color", getBg(this));
        });
    }
    $.fn.cycle.commonReset = function(curr, next, opts, w, h, rev) {
        $(opts.elements).not(curr).hide();
        if (typeof opts.cssBefore.opacity == "undefined") {
            opts.cssBefore.opacity = 1;
        }
        opts.cssBefore.display = "block";
        if (opts.slideResize && w !== false && next.cycleW > 0) {
            opts.cssBefore.width = next.cycleW;
        }
        if (opts.slideResize && h !== false && next.cycleH > 0) {
            opts.cssBefore.height = next.cycleH;
        }
        opts.cssAfter = opts.cssAfter || {};
        opts.cssAfter.display = "none";
        $(curr).css("zIndex", opts.slideCount + (rev === true ? 1 : 0));
        $(next).css("zIndex", opts.slideCount + (rev === true ? 0 : 1));
    };
    $.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
        var $l = $(curr), $n = $(next);
        var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut;
        $n.css(opts.cssBefore);
        if (speedOverride) {
            if (typeof speedOverride == "number") {
                speedIn = speedOut = speedOverride;
            } else {
                speedIn = speedOut = 1;
            }
            easeIn = easeOut = null;
        }
        var fn = function() {
            $n.animate(opts.animIn, speedIn, easeIn, function() {
                cb();
            });
        };
        $l.animate(opts.animOut, speedOut, easeOut, function() {
            $l.css(opts.cssAfter);
            if (!opts.sync) {
                fn();
            }
        });
        if (opts.sync) {
            fn();
        }
    };
    $.fn.cycle.transitions = {fade: function($cont, $slides, opts) {
            $slides.not(":eq(" + opts.currSlide + ")").css("opacity", 0);
            opts.before.push(function(curr, next, opts) {
                $.fn.cycle.commonReset(curr, next, opts);
                opts.cssBefore.opacity = 0;
            });
            opts.animIn = {opacity: 1};
            opts.animOut = {opacity: 0};
            opts.cssBefore = {top: 0,left: 0};
        }};
    $.fn.cycle.ver = function() {
        return ver;
    };
    $.fn.cycle.defaults = {activePagerClass: "activeSlide",after: null,allowPagerClickBubble: false,animIn: null,animOut: null,aspect: false,autostop: 0,autostopCount: 0,backwards: false,before: null,center: null,cleartype: !$.support.opacity,cleartypeNoBg: false,containerResize: 1,containerResizeHeight: 0,continuous: 0,cssAfter: null,cssBefore: null,delay: 0,easeIn: null,easeOut: null,easing: null,end: null,fastOnEvent: 0,fit: 0,fx: "fade",fxFn: null,height: "auto",manualTrump: true,metaAttr: "cycle",next: null,nowrap: 0,onPagerEvent: null,onPrevNextEvent: null,pager: null,pagerAnchorBuilder: null,pagerEvent: "click.cycle",pause: 0,pauseOnPagerHover: 0,prev: null,prevNextEvent: "click.cycle",random: 0,randomizeEffects: 1,requeueOnImageNotLoaded: true,requeueTimeout: 250,rev: 0,shuffle: null,skipInitializationCallbacks: false,slideExpr: null,slideResize: 1,speed: 1000,speedIn: null,speedOut: null,startingSlide: undefined,sync: 1,timeout: 4000,timeoutFn: null,updateActivePagerLink: null,width: null};
})(jQuery);
(function($) {
    $.fn.cycle.transitions.none = function($cont, $slides, opts) {
        opts.fxFn = function(curr, next, opts, after) {
            $(next).show();
            $(curr).hide();
            after();
        };
    };
    $.fn.cycle.transitions.fadeout = function($cont, $slides, opts) {
        $slides.not(":eq(" + opts.currSlide + ")").css({display: "block","opacity": 1});
        opts.before.push(function(curr, next, opts, w, h, rev) {
            $(curr).css("zIndex", opts.slideCount + (rev !== true ? 1 : 0));
            $(next).css("zIndex", opts.slideCount + (rev !== true ? 0 : 1));
        });
        opts.animIn.opacity = 1;
        opts.animOut.opacity = 0;
        opts.cssBefore.opacity = 1;
        opts.cssBefore.display = "block";
        opts.cssAfter.zIndex = 0;
    };
    $.fn.cycle.transitions.scrollUp = function($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssBefore.top = h;
        opts.cssBefore.left = 0;
        opts.cssFirst.top = 0;
        opts.animIn.top = 0;
        opts.animOut.top = -h;
    };
    $.fn.cycle.transitions.scrollDown = function($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssFirst.top = 0;
        opts.cssBefore.top = -h;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.top = h;
    };
    $.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst.left = 0;
        opts.cssBefore.left = w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = 0 - w;
    };
    $.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst.left = 0;
        opts.cssBefore.left = -w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = w;
    };
    $.fn.cycle.transitions.scrollHorz = function($cont, $slides, opts) {
        $cont.css("overflow", "hidden").width();
        opts.before.push(function(curr, next, opts, fwd) {
            if (opts.rev) {
                fwd = !fwd;
            }
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.left = fwd ? (next.cycleW - 1) : (1 - next.cycleW);
            opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
        });
        opts.cssFirst.left = 0;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.top = 0;
    };
    $.fn.cycle.transitions.scrollVert = function($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push(function(curr, next, opts, fwd) {
            if (opts.rev) {
                fwd = !fwd;
            }
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.top = fwd ? (1 - next.cycleH) : (next.cycleH - 1);
            opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.left = 0;
    };
    $.fn.cycle.transitions.slideX = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.animIn.width = next.cycleW;
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
        opts.animIn.width = "show";
        opts.animOut.width = 0;
    };
    $.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.animIn.height = next.cycleH;
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.height = 0;
        opts.animIn.height = "show";
        opts.animOut.height = 0;
    };
    $.fn.cycle.transitions.shuffle = function($cont, $slides, opts) {
        var i, w = $cont.css("overflow", "visible").width();
        $slides.css({left: 0,top: 0});
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
        });
        if (!opts.speedAdjusted) {
            opts.speed = opts.speed / 2;
            opts.speedAdjusted = true;
        }
        opts.random = 0;
        opts.shuffle = opts.shuffle || {left: -w,top: 15};
        opts.els = [];
        for (i = 0; i < $slides.length; i++) {
            opts.els.push($slides[i]);
        }
        for (i = 0; i < opts.currSlide; i++) {
            opts.els.push(opts.els.shift());
        }
        opts.fxFn = function(curr, next, opts, cb, fwd) {
            if (opts.rev) {
                fwd = !fwd;
            }
            var $el = fwd ? $(curr) : $(next);
            $(next).css(opts.cssBefore);
            var count = opts.slideCount;
            $el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function() {
                var hops = $.fn.cycle.hopsFromLast(opts, fwd);
                for (var k = 0; k < hops; k++) {
                    if (fwd) {
                        opts.els.push(opts.els.shift());
                    } else {
                        opts.els.unshift(opts.els.pop());
                    }
                }
                if (fwd) {
                    for (var i = 0, len = opts.els.length; i < len; i++) {
                        $(opts.els[i]).css("z-index", len - i + count);
                    }
                } else {
                    var z = $(curr).css("z-index");
                    $el.css("z-index", parseInt(z, 10) + 1 + count);
                }
                $el.animate({left: 0,top: 0}, opts.speedOut, opts.easeOut, function() {
                    $(fwd ? this : curr).hide();
                    if (cb) {
                        cb();
                    }
                });
            });
        };
        $.extend(opts.cssBefore, {display: "block",opacity: 1,top: 0,left: 0});
    };
    $.fn.cycle.transitions.turnUp = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.cssBefore.top = next.cycleH;
            opts.animIn.height = next.cycleH;
            opts.animOut.width = next.cycleW;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.cssBefore.height = 0;
        opts.animIn.top = 0;
        opts.animOut.height = 0;
    };
    $.fn.cycle.transitions.turnDown = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.height = 0;
        opts.animOut.height = 0;
    };
    $.fn.cycle.transitions.turnLeft = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.cssBefore.left = next.cycleW;
            opts.animIn.width = next.cycleW;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
        opts.animIn.left = 0;
        opts.animOut.width = 0;
    };
    $.fn.cycle.transitions.turnRight = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW;
        });
        $.extend(opts.cssBefore, {top: 0,left: 0,width: 0});
        opts.animIn.left = 0;
        opts.animOut.width = 0;
    };
    $.fn.cycle.transitions.zoom = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, false, true);
            opts.cssBefore.top = next.cycleH / 2;
            opts.cssBefore.left = next.cycleW / 2;
            $.extend(opts.animIn, {top: 0,left: 0,width: next.cycleW,height: next.cycleH});
            $.extend(opts.animOut, {width: 0,height: 0,top: curr.cycleH / 2,left: curr.cycleW / 2});
        });
        opts.cssFirst.top = 0;
        opts.cssFirst.left = 0;
        opts.cssBefore.width = 0;
        opts.cssBefore.height = 0;
    };
    $.fn.cycle.transitions.fadeZoom = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, false);
            opts.cssBefore.left = next.cycleW / 2;
            opts.cssBefore.top = next.cycleH / 2;
            $.extend(opts.animIn, {top: 0,left: 0,width: next.cycleW,height: next.cycleH});
        });
        opts.cssBefore.width = 0;
        opts.cssBefore.height = 0;
        opts.animOut.opacity = 0;
    };
    $.fn.cycle.transitions.blindX = function($cont, $slides, opts) {
        var w = $cont.css("overflow", "hidden").width();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW;
        });
        opts.cssBefore.left = w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = w;
    };
    $.fn.cycle.transitions.blindY = function($cont, $slides, opts) {
        var h = $cont.css("overflow", "hidden").height();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssBefore.top = h;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.top = h;
    };
    $.fn.cycle.transitions.blindZ = function($cont, $slides, opts) {
        var h = $cont.css("overflow", "hidden").height();
        var w = $cont.width();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssBefore.top = h;
        opts.cssBefore.left = w;
        opts.animIn.top = 0;
        opts.animIn.left = 0;
        opts.animOut.top = h;
        opts.animOut.left = w;
    };
    $.fn.cycle.transitions.growX = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.cssBefore.left = this.cycleW / 2;
            opts.animIn.left = 0;
            opts.animIn.width = this.cycleW;
            opts.animOut.left = 0;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
    };
    $.fn.cycle.transitions.growY = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.cssBefore.top = this.cycleH / 2;
            opts.animIn.top = 0;
            opts.animIn.height = this.cycleH;
            opts.animOut.top = 0;
        });
        opts.cssBefore.height = 0;
        opts.cssBefore.left = 0;
    };
    $.fn.cycle.transitions.curtainX = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true, true);
            opts.cssBefore.left = next.cycleW / 2;
            opts.animIn.left = 0;
            opts.animIn.width = this.cycleW;
            opts.animOut.left = curr.cycleW / 2;
            opts.animOut.width = 0;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
    };
    $.fn.cycle.transitions.curtainY = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false, true);
            opts.cssBefore.top = next.cycleH / 2;
            opts.animIn.top = 0;
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH / 2;
            opts.animOut.height = 0;
        });
        opts.cssBefore.height = 0;
        opts.cssBefore.left = 0;
    };
    $.fn.cycle.transitions.cover = function($cont, $slides, opts) {
        var d = opts.direction || "left";
        var w = $cont.css("overflow", "hidden").width();
        var h = $cont.height();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssAfter.display = "";
            if (d == "right") {
                opts.cssBefore.left = -w;
            } else {
                if (d == "up") {
                    opts.cssBefore.top = h;
                } else {
                    if (d == "down") {
                        opts.cssBefore.top = -h;
                    } else {
                        opts.cssBefore.left = w;
                    }
                }
            }
        });
        opts.animIn.left = 0;
        opts.animIn.top = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.left = 0;
    };
    $.fn.cycle.transitions.uncover = function($cont, $slides, opts) {
        var d = opts.direction || "left";
        var w = $cont.css("overflow", "hidden").width();
        var h = $cont.height();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
            if (d == "right") {
                opts.animOut.left = w;
            } else {
                if (d == "up") {
                    opts.animOut.top = -h;
                } else {
                    if (d == "down") {
                        opts.animOut.top = h;
                    } else {
                        opts.animOut.left = -w;
                    }
                }
            }
        });
        opts.animIn.left = 0;
        opts.animIn.top = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.left = 0;
    };
    $.fn.cycle.transitions.toss = function($cont, $slides, opts) {
        var w = $cont.css("overflow", "visible").width();
        var h = $cont.height();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
            if (!opts.animOut.left && !opts.animOut.top) {
                $.extend(opts.animOut, {left: w * 2,top: -h / 2,opacity: 0});
            } else {
                opts.animOut.opacity = 0;
            }
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
    };
    $.fn.cycle.transitions.wipe = function($cont, $slides, opts) {
        var w = $cont.css("overflow", "hidden").width();
        var h = $cont.height();
        opts.cssBefore = opts.cssBefore || {};
        var clip;
        if (opts.clip) {
            if (/l2r/.test(opts.clip)) {
                clip = "rect(0px 0px " + h + "px 0px)";
            } else {
                if (/r2l/.test(opts.clip)) {
                    clip = "rect(0px " + w + "px " + h + "px " + w + "px)";
                } else {
                    if (/t2b/.test(opts.clip)) {
                        clip = "rect(0px " + w + "px 0px 0px)";
                    } else {
                        if (/b2t/.test(opts.clip)) {
                            clip = "rect(" + h + "px " + w + "px " + h + "px 0px)";
                        } else {
                            if (/zoom/.test(opts.clip)) {
                                var top = parseInt(h / 2, 10);
                                var left = parseInt(w / 2, 10);
                                clip = "rect(" + top + "px " + left + "px " + top + "px " + left + "px)";
                            }
                        }
                    }
                }
            }
        }
        opts.cssBefore.clip = opts.cssBefore.clip || clip || "rect(0px 0px 0px 0px)";
        var d = opts.cssBefore.clip.match(/(\d+)/g);
        var t = parseInt(d[0], 10), r = parseInt(d[1], 10), b = parseInt(d[2], 10), l = parseInt(d[3], 10);
        opts.before.push(function(curr, next, opts) {
            if (curr == next) {
                return;
            }
            var $curr = $(curr), $next = $(next);
            $.fn.cycle.commonReset(curr, next, opts, true, true, false);
            opts.cssAfter.display = "block";
            var step = 1, count = parseInt((opts.speedIn / 13), 10) - 1;
            (function f() {
                var tt = t ? t - parseInt(step * (t / count), 10) : 0;
                var ll = l ? l - parseInt(step * (l / count), 10) : 0;
                var bb = b < h ? b + parseInt(step * ((h - b) / count || 1), 10) : h;
                var rr = r < w ? r + parseInt(step * ((w - r) / count || 1), 10) : w;
                $next.css({clip: "rect(" + tt + "px " + rr + "px " + bb + "px " + ll + "px)"});
                (step++ <= count) ? setTimeout(f, 13) : $curr.css("display", "none");
            })();
        });
        $.extend(opts.cssBefore, {display: "block",opacity: 1,top: 0,left: 0});
        opts.animIn = {left: 0};
        opts.animOut = {left: 0};
    };
})(jQuery);


// jQuery Transit - CSS3 transitions and transformations
// http://ricostacruz.com/jquery.transit
// http://github.com/rstacruz/jquery.transit
(function(d) {
    function k(a) {
        var b = ["Moz", "Webkit", "O", "ms"], c = a.charAt(0).toUpperCase() + a.substr(1);
        if (a in i.style)
            return a;
        for (a = 0; a < b.length; ++a) {
            var d = b[a] + c;
            if (d in i.style)
                return d
        }
    }
    function j(a) {
        "string" === typeof a && this.parse(a);
        return this
    }
    function p(a, b, c) {
        !0 === b ? a.queue(c) : b ? a.queue(b, c) : c()
    }
    function m(a) {
        var b = [];
        d.each(a, function(a) {
            a = d.camelCase(a);
            a = d.transit.propertyMap[a] || a;
            a = r(a);
            -1 === d.inArray(a, b) && b.push(a)
        });
        return b
    }
    function q(a, b, c, e) {
        a = m(a);
        d.cssEase[c] && (c = d.cssEase[c]);
        var h = "" + n(b) + " " + c;
        0 < parseInt(e, 10) && (h += " " + n(e));
        var f = [];
        d.each(a, function(a, b) {
            f.push(b + " " + h)
        });
        return f.join(", ")
    }
    function f(a, b) {
        b || (d.cssNumber[a] = !0);
        d.transit.propertyMap[a] = e.transform;
        d.cssHooks[a] = {get: function(b) {
                return (d(b).css("transform") || new j).get(a)
            },set: function(b, e) {
                var h = d(b).css("transform") || new j;
                h.setFromString(a, e);
                d(b).css({transform: h})
            }}
    }
    function r(a) {
        return a.replace(/([A-Z])/g, function(a) {
            return "-" + a.toLowerCase()
        })
    }
    function g(a, b) {
        return "string" === typeof a && !a.match(/^[\-0-9\.]+$/) ? 
        a : "" + a + b
    }
    function n(a) {
        d.fx.speeds[a] && (a = d.fx.speeds[a]);
        return g(a, "ms")
    }
    d.transit = {version: "0.1.3",propertyMap: {marginLeft: "margin",marginRight: "margin",marginBottom: "margin",marginTop: "margin",paddingLeft: "padding",paddingRight: "padding",paddingBottom: "padding",paddingTop: "padding"},enabled: !0,useTransitionEnd: !1};
    var i = document.createElement("div"), e = {}, s = -1 < navigator.userAgent.toLowerCase().indexOf("chrome");
    e.transition = k("transition");
    e.transitionDelay = k("transitionDelay");
    e.transform = k("transform");
    e.transformOrigin = k("transformOrigin");
    i.style[e.transform] = "";
    i.style[e.transform] = "rotateY(90deg)";
    e.transform3d = "" !== i.style[e.transform];
    d.extend(d.support, e);
    var o = e.transitionEnd = {MozTransition: "transitionend",OTransition: "oTransitionEnd",WebkitTransition: "webkitTransitionEnd",msTransition: "MSTransitionEnd"}[e.transition] || null, i = null;
    d.cssEase = {_default: "ease","in": "ease-in",out: "ease-out","in-out": "ease-in-out",snap: "cubic-bezier(0,1,.5,1)"};
    d.cssHooks.transform = {get: function(a) {
            return d(a).data("transform")
        },
        set: function(a, b) {
            var c = b;
            c instanceof j || (c = new j(c));
            a.style[e.transform] = "WebkitTransform" === e.transform && !s ? c.toString(!0) : c.toString();
            d(a).data("transform", c)
        }};
    d.cssHooks.transformOrigin = {get: function(a) {
            return a.style[e.transformOrigin]
        },set: function(a, b) {
            a.style[e.transformOrigin] = b
        }};
    d.cssHooks.transition = {get: function(a) {
            return a.style[e.transition]
        },set: function(a, b) {
            a.style[e.transition] = b
        }};
    f("scale");
    f("translate");
    f("rotate");
    f("rotateX");
    f("rotateY");
    f("rotate3d");
    f("perspective");
    f("skewX");
    f("skewY");
    f("x", !0);
    f("y", !0);
    j.prototype = {setFromString: function(a, b) {
            var c = "string" === typeof b ? b.split(",") : b.constructor === Array ? b : [b];
            c.unshift(a);
            j.prototype.set.apply(this, c)
        },set: function(a) {
            var b = Array.prototype.slice.apply(arguments, [1]);
            this.setter[a] ? this.setter[a].apply(this, b) : this[a] = b.join(",")
        },get: function(a) {
            return this.getter[a] ? this.getter[a].apply(this) : this[a] || 0
        },setter: {rotate: function(a) {
                this.rotate = g(a, "deg")
            },rotateX: function(a) {
                this.rotateX = g(a, "deg")
            },rotateY: function(a) {
                this.rotateY = 
                g(a, "deg")
            },scale: function(a, b) {
                void 0 === b && (b = a);
                this.scale = a + "," + b
            },skewX: function(a) {
                this.skewX = g(a, "deg")
            },skewY: function(a) {
                this.skewY = g(a, "deg")
            },perspective: function(a) {
                this.perspective = g(a, "px")
            },x: function(a) {
                this.set("translate", a, null)
            },y: function(a) {
                this.set("translate", null, a)
            },translate: function(a, b) {
                void 0 === this._translateX && (this._translateX = 0);
                void 0 === this._translateY && (this._translateY = 0);
                null !== a && (this._translateX = g(a, "px"));
                null !== b && (this._translateY = g(b, "px"));
                this.translate = 
                this._translateX + "," + this._translateY
            }},getter: {x: function() {
                return this._translateX || 0
            },y: function() {
                return this._translateY || 0
            },scale: function() {
                var a = (this.scale || "1,1").split(",");
                a[0] && (a[0] = parseFloat(a[0]));
                a[1] && (a[1] = parseFloat(a[1]));
                return a[0] === a[1] ? a[0] : a
            },rotate3d: function() {
                for (var a = (this.rotate3d || "0,0,0,0deg").split(","), b = 0; 3 >= b; ++b)
                    a[b] && (a[b] = parseFloat(a[b]));
                a[3] && (a[3] = g(a[3], "deg"));
                return a
            }},parse: function(a) {
            var b = this;
            a.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(a, d, 
            e) {
                b.setFromString(d, e)
            })
        },toString: function(a) {
            var b = [], c;
            for (c in this)
                if (this.hasOwnProperty(c) && (e.transform3d || !("rotateX" === c || "rotateY" === c || "perspective" === c || "transformOrigin" === c)))
                    "_" !== c[0] && (a && "scale" === c ? b.push(c + "3d(" + this[c] + ",1)") : a && "translate" === c ? b.push(c + "3d(" + this[c] + ",0)") : b.push(c + "(" + this[c] + ")"));
            return b.join(" ")
        }};
    d.fn.transition = d.fn.transit = function(a, b, c, f) {
        var h = this, g = 0, i = !0;
        "function" === typeof b && (f = b, b = void 0);
        "function" === typeof c && (f = c, c = void 0);
        "undefined" !== 
        typeof a.easing && (c = a.easing, delete a.easing);
        "undefined" !== typeof a.duration && (b = a.duration, delete a.duration);
        "undefined" !== typeof a.complete && (f = a.complete, delete a.complete);
        "undefined" !== typeof a.queue && (i = a.queue, delete a.queue);
        "undefined" !== typeof a.delay && (g = a.delay, delete a.delay);
        "undefined" === typeof b && (b = d.fx.speeds._default);
        "undefined" === typeof c && (c = d.cssEase._default);
        var b = n(b), j = q(a, b, c, g), l = d.transit.enabled && e.transition ? parseInt(b, 10) + parseInt(g, 10) : 0;
        if (0 === l)
            return p(h, i, function(b) {
                h.css(a);
                f && f.apply(h);
                b && b()
            }), h;
        var k = {}, m = function(b) {
            var c = false, g = function() {
                c && h.unbind(o, g);
                l > 0 && h.each(function() {
                    this.style[e.transition] = k[this] || null
                });
                typeof f === "function" && f.apply(h);
                typeof b === "function" && b()
            };
            if (l > 0 && o && d.transit.useTransitionEnd) {
                c = true;
                h.bind(o, g)
            } else
                window.setTimeout(g, l);
            h.each(function() {
                l > 0 && (this.style[e.transition] = j);
                d(this).css(a)
            })
        };
        p(h, i, function(a) {
            var b = 0;
            e.transition === "MozTransition" && b < 25 && (b = 25);
            window.setTimeout(function() {
                m(a)
            }, b)
        });
        return this
    };
    d.transit.getTransitionValue = 
    q
})(jQuery);
if (!$.support.transition)
    $.fn.transition = $.fn.animate;


// nextOrFirst and prevOrLast
$.fn.nextOrFirst = function(selector) {
    var next = this.next(selector);
    return (next.length) ? next : this.prevAll(selector).last();
};
$.fn.prevOrLast = function(selector) {
    var prev = this.prev(selector);
    return (prev.length) ? prev : this.nextAll(selector).last();
};


// Set reversal!
$.fn.reverse = [].reverse;
