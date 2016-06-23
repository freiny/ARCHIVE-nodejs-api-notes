package challenge

import (
	"bytes"
	"strings"
	"testing"

	"github.com/freiny/go-util/ftest"
)

func NextLetterVowelUp(s string) string {
	a := "abcdefghijklmnopqrstuvwxyzaABCDEFGHIJKLMNOPQRSTUVWXYZA"
	m := map[byte]byte{}
	for i := 0; i < len(a)-1; i++ {
		if m[a[i]] == 0 {
			m[a[i]] = a[i+1]
		}
	}

	v := "aeiou"
	var b bytes.Buffer

	for i := 0; i < len(s); i++ {

		switch {
		case m[s[i]] == 0:
			b.WriteString(string(s[i]))
		case m[s[i]] != 0:
			c := string(m[s[i]])
			if strings.Contains(v, c) {
				c = strings.ToUpper(c)
			}
			b.WriteString(c)
		}
	}

	return b.String()
}

func TestNextLetterVowelUp(t *testing.T) {
	tests := []ftest.Test{
		{1, NextLetterVowelUp(""), ""},
		{2, NextLetterVowelUp(" \t"), " \t"},
		{3, NextLetterVowelUp("a bc d"), "b cd E"},
		{3, NextLetterVowelUp("ah zA Zd"), "bI AB AE"},
	}
	ftest.Assert(t, tests, func(s string) { t.Errorf(s) })
}
