/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'echarts'], factory);
	} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
		factory(exports, require('echarts'));
	} else {
		factory({}, root.echarts);
	}
}(this, function(exports, echarts) {
	var log = function(msg) {
		if (typeof console !== 'undefined') {
			console && console.error && console.error(msg);
		}
	};
	if (!echarts) {
		log('ECharts is not Loaded');
		return;
	}
	if (!echarts.registerMap) {
		log('ECharts Map is not loaded');
		return;
	}
	echarts.registerMap('world', {
		"type": "FeatureCollection",
		"crs": {
			"type": "name",
			"properties": {
				"name": "urn:ogc:def:crs:OGC:1.3:CRS84"
			}
		},
		"features": [{
			"geometry": {
				"type": "Polygon",
				"coordinates": [
					"@@MΥ٫֕ۖߕÄ޽ںՓe˂ȕDƳ¦Ȟ_d[iűĩĒǖJ̆ƷáśīÉ_˧şĕ·ãÑ{­_©ÒǃZ·¹ǡaÙüÕ`NĻÙŇÇ@ˣ̻ġíaéÏR¹»ÝËΫƅГݽһɷ§¯ƍ̍Ʊƙ·ŉeí˟ý̛ʻįÛIęº¿Ƙȍôƅù§¥āŻŹȅ˟ʣć̵ըɋǛ£οƐǟ¼iľI´HÄjàHȱȎ̡ÖƟÐővÍuKÚšA}½¯Dgååa§O³Pão¬R°eɏ¿ǅËʗĹõNç¬Ù¢īDǫMīBËdÇ[ëhuC¡¦kMg_WuGʧȡFěaĉmıÑ£ēɋŲǇų̟̂řӨϿĖG̬̿͂ǉĝ˰£ළřıĻԋȀх¥ÃţྥqjbzêrʤĜSºNdÎªbnvŸ|Ɯ¼ʄŤĪWÔŒܚƦdƠ²xR^QǖÂ Gx²»{RΏZ~҈iͶܹ̂ا࠸ıĸǅǐ͌ğٶǿЎĹࣼöҀėʜŸל^ॖʴĮ߀МϮԼyʈĠƅƌӨʠξ@ɬƙΈʬиɔӲٔɦ̹؀ٞ¯ͮĆːŉƊվո£̨͗и¢âࡢԨ۸Ŋ"
				],
				"encodeOffsets": [
					[74844, 37750]
				]
			},
			"properties": {
				"name": "Pakistan",
				"childNum": 1
			}
		}],
		"UTF8Encoding": true
	});
}));
